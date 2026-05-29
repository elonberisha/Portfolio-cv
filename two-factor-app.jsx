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

/* ── Shield icon ──────────────────────────────────────────────── */
function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

/* ── QR Code placeholder SVG ──────────────────────────────────── */
function QRPlaceholder() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
      {/* top-left finder */}
      <rect x="10" y="10" width="35" height="35" rx="4" stroke="#1a1714" strokeWidth="3" fill="none"/>
      <rect x="17" y="17" width="21" height="21" rx="2" fill="#1a1714"/>
      {/* top-right finder */}
      <rect x="95" y="10" width="35" height="35" rx="4" stroke="#1a1714" strokeWidth="3" fill="none"/>
      <rect x="102" y="17" width="21" height="21" rx="2" fill="#1a1714"/>
      {/* bottom-left finder */}
      <rect x="10" y="95" width="35" height="35" rx="4" stroke="#1a1714" strokeWidth="3" fill="none"/>
      <rect x="17" y="102" width="21" height="21" rx="2" fill="#1a1714"/>
      {/* data dots */}
      {[
        [55,15],[65,15],[75,15],[85,15],
        [55,25],[75,25],
        [55,35],[65,35],[85,35],
        [15,55],[25,55],[35,55],[55,55],[65,55],[75,55],[95,55],[105,55],[115,55],
        [15,65],[35,65],[55,65],[75,65],[95,65],[115,65],
        [15,75],[25,75],[35,75],[55,75],[65,75],[75,75],[85,75],[95,75],[105,75],[115,75],
        [55,85],[75,85],[85,85],[95,85],[115,85],
        [55,95],[65,95],[85,95],[105,95],
        [55,105],[75,105],[95,105],[105,105],[115,105],
        [55,115],[65,115],[75,115],[85,115],[95,115],[115,115],
      ].map(([x,y], i) => (
        <rect key={i} x={x} y={y} width="8" height="8" rx="1.5" fill="#1a1714" opacity="0.75"/>
      ))}
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
    if (val && i < length - 1) refs.current[i + 1]?.focus();
    if (next.every(d => d !== '')) onComplete?.(next.join(''));
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!text) return;
    const next = [...digits];
    text.split('').forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    refs.current[Math.min(text.length, length - 1)]?.focus();
    if (next.every(d => d !== '')) onComplete?.(next.join(''));
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

/* ── 2FA SETUP PAGE ───────────────────────────────────────────── */
function TwoFactorSetup() {
  const [step, setStep] = useState('scan'); // scan → confirm → done
  const secretKey = 'JBSWY3DPEHPK3PXP'; // placeholder

  const handleConfirm = (code) => {
    // In production: POST to API to verify TOTP code
    setStep('done');
  };

  if (step === 'done') {
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
              <h2>2FA enabled</h2>
              <p>Two-factor authentication is now active on your account.</p>
              <p style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 8 }}>You'll be asked for a code from your authenticator app each time you sign in.</p>
              <a className="back-link" href="signin.html" style={{ marginTop: 20 }}>Continue →</a>
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
            <div style={{ width: 56, height: 56, borderRadius: 999, background: 'color-mix(in oklab, var(--live) 10%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--live)' }}>
              <ShieldIcon />
            </div>
            <h1>Set up <em>2FA</em></h1>
            <p>Add an extra layer of security to your account.</p>
          </div>

          {step === 'scan' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              <div className="auth-info">
                <div className="info-icon">1</div>
                <div>Open your authenticator app (Google Authenticator, Authy, 1Password) and scan this QR code.</div>
              </div>

              <div className="qr-wrap">
                <div className="qr-box">
                  <QRPlaceholder />
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-2)', fontFamily: 'var(--mono)' }}>Can't scan? Enter this key manually:</div>
                <div className="qr-secret" title="Click to copy">{secretKey}</div>
              </div>

              <button className="auth-submit" onClick={() => setStep('confirm')}>
                I've scanned it <span>→</span>
              </button>
            </div>
          )}

          {step === 'confirm' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              <div className="auth-info">
                <div className="info-icon">2</div>
                <div>Enter the 6-digit code from your authenticator app to confirm setup.</div>
              </div>

              <CodeInput length={6} onComplete={handleConfirm} />

              <button
                type="button"
                className="auth-submit"
                onClick={() => {
                  const inputs = document.querySelectorAll('.code-inputs input');
                  const code = Array.from(inputs).map(i => i.value).join('');
                  if (code.length === 6) handleConfirm(code);
                }}
              >
                Confirm & enable 2FA <span>→</span>
              </button>

              <div className="or-link">
                <a href="#" onClick={(e) => { e.preventDefault(); setStep('scan'); }}>← Back to QR code</a>
              </div>
            </div>
          )}
        </div>
      </main>
      <PageFooter />
    </>
  );
}

/* ── 2FA VERIFY PAGE (on login) ───────────────────────────────── */
function TwoFactorVerify() {
  const [verified, setVerified] = useState(false);

  const handleComplete = (code) => {
    // In production: POST to API to verify TOTP
    setVerified(true);
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
              <h2>Verified</h2>
              <p>You're signed in. Redirecting...</p>
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
              <ShieldIcon />
            </div>
            <h1>Two-factor <em>auth</em></h1>
            <p>Enter the 6-digit code from your authenticator app.</p>
          </div>

          <form className="auth-form" onSubmit={e => e.preventDefault()} style={{ marginTop: 20 }}>
            <CodeInput length={6} onComplete={handleComplete} />

            <button
              type="button"
              className="auth-submit"
              onClick={() => {
                const inputs = document.querySelectorAll('.code-inputs input');
                const code = Array.from(inputs).map(i => i.value).join('');
                if (code.length === 6) handleComplete(code);
              }}
            >
              Verify <span>→</span>
            </button>
          </form>

          <div className="auth-footer">
            Lost your authenticator? <a href="#">Use a recovery code</a>
          </div>
        </div>
      </main>
      <PageFooter />
    </>
  );
}

/* ── mount ─────────────────────────────────────────────────────── */
(function () {
  const page = document.querySelector('script[data-page]')?.getAttribute('data-page') || 'verify';
  const App = page === 'setup' ? TwoFactorSetup : TwoFactorVerify;
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
