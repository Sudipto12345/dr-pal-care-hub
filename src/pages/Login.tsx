import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/30 px-4">
      <Card className="w-full max-w-md border-border rounded-2xl shadow-elevated">
        <CardHeader className="text-center">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="font-heading text-2xl">{isSignup ? "Create Account" : "Welcome Back"}</CardTitle>
          <p className="text-sm text-muted-foreground">{isSignup ? "Sign up for your patient portal" : "Login to your patient portal"}</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {isSignup && <Input placeholder="Full Name" className="rounded-xl" />}
            <Input placeholder="Email" type="email" className="rounded-xl" />
            <Input placeholder="Password" type="password" className="rounded-xl" />
            <Button variant="hero" className="w-full" type="submit">
              {isSignup ? "Sign Up" : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setIsSignup(!isSignup)} className="text-secondary font-medium hover:underline">
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to Home</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
