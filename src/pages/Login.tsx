import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Leaf, Loader2, IdCard, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [mode, setMode] = useState<"email" | "id">("email");
  const [isSignup, setIsSignup] = useState(false);

  // Email mode
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Patient ID mode
  const [patientCode, setPatientCode] = useState("");
  const [passcode, setPasscode] = useState("");

  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isSignup) {
      const { error } = await signUp(email, password, name);
      if (error) toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      else {
        toast({ title: "Account created!", description: "Please check your email to verify your account." });
        setIsSignup(false);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      } else {
        const { data: { user: u } } = await supabase.auth.getUser();
        if (u) {
          const { data: r } = await supabase.from("user_roles").select("role").eq("user_id", u.id).maybeSingle();
          navigate(r?.role === "admin" ? "/admin/dashboard" : "/patient/dashboard");
        } else {
          navigate("/patient/dashboard");
        }
      }
    }
    setLoading(false);
  };

  const handleIdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(patientCode)) {
      toast({ title: "Invalid Patient ID", description: "Must be exactly 5 digits", variant: "destructive" });
      return;
    }
    if (!/^\d{6}$/.test(passcode)) {
      toast({ title: "Invalid Passcode", description: "Must be exactly 6 digits", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      // Look up the synthetic auth email for this patient code
      const { data: loginEmail, error: lookupErr } = await supabase.rpc("get_patient_login_email", { _code: patientCode });
      if (lookupErr || !loginEmail) {
        toast({ title: "Patient not found", description: "Check your Patient ID", variant: "destructive" });
        setLoading(false);
        return;
      }
      const { error } = await signIn(loginEmail, passcode);
      if (error) toast({ title: "Login failed", description: "Wrong Patient ID or Passcode", variant: "destructive" });
      else navigate("/patient/dashboard");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/30 px-4">
      <Card className="w-full max-w-md border-border rounded-2xl shadow-elevated">
        <CardHeader className="text-center">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="font-heading text-2xl">{isSignup ? "Create Account" : "Welcome Back"}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {isSignup ? "Sign up for your patient portal" : "Login to your account"}
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={mode} onValueChange={(v) => setMode(v as "email" | "id")} className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4 rounded-xl">
              <TabsTrigger value="email" className="rounded-lg"><Mail className="w-3.5 h-3.5 mr-1.5" /> Email</TabsTrigger>
              <TabsTrigger value="id" className="rounded-lg"><IdCard className="w-3.5 h-3.5 mr-1.5" /> Patient ID</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form className="space-y-4" onSubmit={handleEmailSubmit}>
                {isSignup && (
                  <Input placeholder="Full Name" className="rounded-xl" value={name} onChange={(e) => setName(e.target.value)} required />
                )}
                <Input placeholder="Email" type="email" className="rounded-xl" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input placeholder="Password" type="password" className="rounded-xl" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                <Button variant="hero" className="w-full" type="submit" disabled={loading}>
                  {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                  {isSignup ? "Sign Up" : "Login"}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <button type="button" onClick={() => setIsSignup(!isSignup)} className="text-secondary font-medium hover:underline">
                  {isSignup ? "Login" : "Sign Up"}
                </button>
              </div>
            </TabsContent>

            <TabsContent value="id">
              <form className="space-y-4" onSubmit={handleIdSubmit}>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">5-digit Patient ID</label>
                  <Input
                    placeholder="10001"
                    inputMode="numeric"
                    maxLength={5}
                    className="rounded-xl text-center tracking-[0.4em] font-mono text-lg"
                    value={patientCode}
                    onChange={(e) => setPatientCode(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">6-digit Passcode</label>
                  <Input
                    placeholder="• • • • • •"
                    inputMode="numeric"
                    maxLength={6}
                    type="password"
                    className="rounded-xl text-center tracking-[0.4em] font-mono text-lg"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ""))}
                    required
                  />
                </div>
                <Button variant="hero" className="w-full" type="submit" disabled={loading}>
                  {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                  Login with Patient ID
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Don't have a Patient ID? Contact the clinic to register.
                </p>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to Home</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
