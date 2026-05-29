/* global React, ReactDOM */
const { useState } = React;

/* ── Google logo SVG ──────────────────────────────────────────── */
function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      <path fill="none" d="M0 0h48v48H0z"/>
    </svg>
  );
}

/* ── Eye icons for password toggle ────────────────────────────── */
function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

/* ── Nav ──────────────────────────────────────────────────────── */
function Nav() {
  return (
    <header className="nav">
      <a className="brand" href="/">portfolio-cv<i>.online</i><span className="mono">free for every student · forever</span></a>
      <div />
      <div />
    </header>
  );
}

/* ── Page footer ──────────────────────────────────────────────── */
function PageFooter() {
  return (
    <div className="auth-page-footer">
      <span>© 2026 folio.</span>
      <span>
        <a href="#">Privacy</a> · <a href="#">Terms</a>
      </span>
    </div>
  );
}

/* ── Sign In Form ─────────────────────────────────────────────── */
function SignInPage() {
  const [showPw, setShowPw] = useState(false);

  return (
    <>
      <Nav />
      <main className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <div className="kicker"><i></i> Welcome back</div>
            <h1>Sign <em>in</em></h1>
            <p>Pick up where you left off.</p>
          </div>

          <button className="google-btn" type="button">
            <GoogleLogo />
            Continue with Google
          </button>

          <div className="auth-divider">or</div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="field-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@university.edu"
                autoComplete="email"
                autoFocus
              />
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrap">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPw(!showPw)}
                  tabIndex={-1}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="auth-extras">
              <label className="remember-row">
                <input type="checkbox" defaultChecked />
                Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="auth-submit">
              Sign in <span>→</span>
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account? <a href="signup.html">Create one free</a>
          </div>
        </div>
      </main>
      <PageFooter />
    </>
  );
}

/* ── Sign Up Form ─────────────────────────────────────────────── */
function SignUpPage() {
  const [showPw, setShowPw] = useState(false);

  return (
    <>
      <Nav />
      <main className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <div className="kicker"><i></i> Join 12,847 students</div>
            <h1>Create your <em>account</em></h1>
            <p>Free forever. No card required.</p>
          </div>

          <button className="google-btn" type="button">
            <GoogleLogo />
            Sign up with Google
          </button>

          <div className="auth-divider">or</div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="field-row">
              <div className="field-group">
                <label htmlFor="first-name">First name</label>
                <input
                  id="first-name"
                  type="text"
                  placeholder="Lina"
                  autoComplete="given-name"
                  autoFocus
                />
              </div>
              <div className="field-group">
                <label htmlFor="last-name">Last name</label>
                <input
                  id="last-name"
                  type="text"
                  placeholder="Marchetti"
                  autoComplete="family-name"
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="email">School email</label>
              <input
                id="email"
                type="email"
                placeholder="you@university.edu"
                autoComplete="email"
              />
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrap">
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPw(!showPw)}
                  tabIndex={-1}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <label className="agree-row">
              <input type="checkbox" id="agree" required />
              I agree to the <a href="terms.html" target="_blank">Terms of Service</a> and <a href="privacy.html" target="_blank">Privacy Policy</a>
            </label>

            <button type="submit" className="auth-submit">
              Create account <span>→</span>
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <a href="signin.html">Sign in</a>
          </div>
        </div>
      </main>
      <PageFooter />
    </>
  );
}

/* ── mount ─────────────────────────────────────────────────────── */
(function () {
  const page = document.querySelector('script[data-page]')?.getAttribute('data-page') || 'signin';
  const App = page === 'signup' ? SignUpPage : SignInPage;
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
