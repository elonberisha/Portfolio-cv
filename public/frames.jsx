/* global React */
// Browser + phone frames. The page rendered inside them is the wireframe content.
// The "Download CV" pill is a PLATFORM-level overlay — it lives on the deployed site
// regardless of which template the student picks, so the button is always available
// even when the template itself doesn't show one.

function PlatformPill({ studentName = "student", compact = false }) {
  const handle = studentName.split(" ")[0].toLowerCase();
  return (
    <div className={`platform-pill ${compact ? "pp-compact" : ""}`} role="region" aria-label="Platform actions">
      <button className="pp-btn pp-primary" title="Download CV as PDF">
        <span className="pp-icon" aria-hidden="true">↓</span>
        <span className="pp-lbl">Download CV</span>
        {!compact && <span className="pp-meta">PDF · 1pg</span>}
      </button>
      {!compact && (
        <div className="pp-foot">
          <span className="pp-dot"></span>
          Made with <b>folio.app</b> · {handle}.folio.app
        </div>
      )}
    </div>
  );
}

function BrowserFrame({ url = "lina.folio.app", children, scrollId, studentName }) {
  return (
    <div className="browser">
      <div className="browser-chrome">
        <div className="dots"><i></i><i></i><i></i></div>
        <div className="url">{url}</div>
        <div style={{ width: 50 }} />
      </div>
      <div className="browser-port" id={scrollId}>
        <div className="frame-port-root">{children}</div>
      </div>
      <PlatformPill studentName={studentName} />
    </div>
  );
}

function PhoneFrame({ children, scrollId, studentName }) {
  return (
    <div className="phone">
      <div className="phone-port" id={scrollId}>
        <div className="phone-notch" />
        <div className="frame-port-root">{children}</div>
      </div>
      <PlatformPill studentName={studentName} compact />
    </div>
  );
}

window.BrowserFrame = BrowserFrame;
window.PhoneFrame = PhoneFrame;
