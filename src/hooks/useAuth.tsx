import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

type AppRole = "admin" | "moderator" | "user";

interface PatientRow {
  id: string;
  name: string;
  phone: string | null;
  age: number | null;
  gender: string | null;
  address: string | null;
  email: string | null;
  patient_code: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: { name: string | null; phone: string | null; avatar_url?: string | null } | null;
  patient: PatientRow | null;
  role: AppRole | null;
  isAdmin: boolean;
  loading: boolean;
  needsProfileCompletion: boolean;
  refreshPatient: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<AuthContextType["profile"]>(null);
  const [patient, setPatient] = useState<PatientRow | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async (userId: string) => {
    const [profileRes, roleRes, patientRes] = await Promise.all([
      supabase.from("profiles").select("name, phone, avatar_url").eq("user_id", userId).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle(),
      supabase.from("patients").select("id, name, phone, age, gender, address, email, patient_code").eq("user_id", userId).maybeSingle(),
    ]);
    if (profileRes.data) setProfile(profileRes.data);
    if (roleRes.data) setRole(roleRes.data.role as AppRole);
    if (patientRes.data) setPatient(patientRes.data as PatientRow);
  }, []);

  const refreshPatient = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("patients")
      .select("id, name, phone, age, gender, address, email, patient_code")
      .eq("user_id", user.id)
      .maybeSingle();
    if (data) setPatient(data as PatientRow);
    const { data: p } = await supabase.from("profiles").select("name, phone, avatar_url").eq("user_id", user.id).maybeSingle();
    if (p) setProfile(p);
  }, [user]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => fetchUserData(session.user.id), 0);
      } else {
        setProfile(null);
        setRole(null);
        setPatient(null);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchUserData]);

  const signUp = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: window.location.origin,
      },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setRole(null);
    setPatient(null);
  };

  // Patient is missing required info if any of these are blank (admins exempt)
  const needsProfileCompletion =
    !!user &&
    role !== "admin" &&
    !!patient &&
    (!patient.phone || !patient.age || !patient.gender || !patient.address);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        patient,
        role,
        isAdmin: role === "admin",
        loading,
        needsProfileCompletion,
        refreshPatient,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
