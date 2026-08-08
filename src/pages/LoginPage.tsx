import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("admin@ablect.local");
  const [password, setPassword] = useState("admin1234");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      const from = (location.state as { from?: string } | null)?.from ?? "/";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-shell">
      <div className="login-orb login-orb-one" />
      <div className="login-orb login-orb-two" />

      <section className="login-panel">
        <div className="login-brand">
          <div className="login-brand-mark">
            <Sparkles size={22} />
          </div>
          <div>
            <p>ABLECT</p>
            <span>Business Suite</span>
          </div>
        </div>

        <div className="login-content">
          <div className="login-intro">
            <div className="login-badge">
              <ShieldCheck size={15} /> Secure workspace
            </div>
            <h1>Welcome back.</h1>
            <p>Sign in to manage your business from one intelligent workspace.</p>
          </div>

          <form className="login-form" onSubmit={submit}>
            <label>
              <span>Email address</span>
              <div className="login-input-wrap">
                <input
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  disabled={loading}
                />
              </div>
            </label>

            <label>
              <span>Password</span>
              <div className="login-input-wrap">
                <LockKeyhole size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            {error && <div className="login-error">{error}</div>}

            <button className="login-submit" type="submit" disabled={loading}>
              <span>{loading ? "Signing in..." : "Sign in to workspace"}</span>
              <ArrowRight size={19} />
            </button>
          </form>

          <div className="login-demo-note">
            <strong>Local prototype</strong>
            <span>admin@ablect.local · admin1234</span>
          </div>
        </div>

        <footer className="login-footer">
          <span>ABLECT Business Suite ERP</span>
          <span>Private business workspace</span>
        </footer>
      </section>
    </main>
  );
}
