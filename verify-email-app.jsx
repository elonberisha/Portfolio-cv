/* global React, ReactDOM */
const { useState, useRef, useEffect } = React;

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
      <span><a href="#">Privacy</a> · <a href="#">Terms</a></span>
    </div>
  );
}

/* ── Mail icon ────────────────────────────────────────────────── */
function MailIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4l-10 8L2 4" />
    </svg>
  );
}

/* ── 6-digit code input ───────────────────────────────────────── */
function CodeInput({ length = 6, onComplete }) {
  const [digits, setDigits] = useState(Array(length).fill(''));
  const refs = useRef([]);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);

    if (val && i < length - 1) {
      refs.current[i + 1]?.focus();
    }
    if (next.every(d => d !== '')) {
      onComplete?.(next.join(''));
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!text) return;
    const next = [...digits];
    text.split('').forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    const focusIdx = Math.min(text.length, length - 1);
    refs.current[focusIdx]?.focus();
    if (next.every(d => d !== '')) {
      onComplete?.(next.join(''));
    }
  };

  return (
    <div className="code-inputs">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={el => refs.current[i] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          placeholder="·"
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          autoFocus={i === 0}
        />
      ))}
    </div>
  );
}

/* ── Verify Email Page ────────────────────────────────────────── */
function VerifyEmailPage() {
  const [verified, setVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const email = new URLSearchParams(window.location.search).get('email') || 'you@university.edu';

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleComplete = (code) => {
    // In production: POST code to API for verification
    setVerified(true);
  };

  const handleResend = () => {
    // In production: POST to resend email
    setResendCooldown(60);
  };

  if (verified) {
    return (
      <>
        <Nav />
        <main className="auth-page">
          <div className="auth-card">
            <div className="success-card">
              <div className="check-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2>Email verified</h2>
              <p>Your email has been confirmed. You're all set.</p>
              <a className="back-link" href="signin.html" style={{ marginTop: 16 }}>Continue to sign in →</a>
            </div>
          </div>
        </main>
        <PageFooter />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="auth-page">
        <div className="auth-card">
          <div className="auth-header">
            <div style={{ width: 56, height: 56, borderRadius: 999, background: 'color-mix(in oklab, var(--accent) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--accent)' }}>
              <MailIcon />
            </div>
            <h1>Check your <em>email</em></h1>
            <p>We sent a 6-digit code to</p>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink)', background: 'var(--paper)', padding: '6px 12px', borderRadius: 6, display: 'inline-block', marginTop: 6, border: '1px solid var(--hairline)' }}>
              {email}
            </div>
          </div>

          <form className="auth-form" onSubmit={e => e.preventDefault()} style={{ marginTop: 24 }}>
            <CodeInput length={6} onComplete={handleComplete} />

            <button
              type="button"
              className="auth-submit"
              onClick={() => {
                // Collect from DOM if user clicks button instead of auto-complete
                const inputs = document.querySelectorAll('.code-inputs input');
                const code = Array.from(inputs).map(i => i.value).join('');
                if (code.length === 6) handleComplete(code);
              }}
            >
              Verify email <span>→</span>
            </button>
          </form>

          <div className="resend-row" style={{ marginTop: 18 }}>
            Didn't receive it?{' '}
            <button onClick={handleResend} disabled={resendCooldown > 0}>
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code'}
            </button>
          </div>

          <div className="or-link" style={{ marginTop: 14 }}>
            Or <a href="#">click the magic link</a> in the email
          </div>

          <div className="auth-footer">
            Wrong email? <a href="signup.html">Go back</a>
          </div>
        </div>
      </main>
      <PageFooter />
    </>
  );
}

/* ── mount ─────────────────────────────────────────────────────── */
ReactDOM.createRoot(document.getElementById('root')).render(<VerifyEmailPage />);
