/* global React, ReactDOM */
const { useState } = React;

/* ── Country list (Kosovo first, then alphabetical) ───────────── */
const COUNTRIES = [
  "Kosovo",
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia",
  "Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium",
  "Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria",
  "Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad",
  "Chile","China","Colombia","Comoros","Congo (DRC)","Congo (Republic)","Costa Rica","Croatia","Cuba",
  "Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador",
  "Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland",
  "France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea",
  "Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq",
  "Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati",
  "Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania",
  "Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania",
  "Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique",
  "Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria",
  "North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama",
  "Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia",
  "Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa",
  "San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone",
  "Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan",
  "Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania",
  "Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda",
  "Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu",
  "Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

const INST_TYPES = [
  "University",
  "College",
  "Vocational School",
  "Academy",
  "Other",
];

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

/* ── Checkmark SVG ────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── Success Card ─────────────────────────────────────────────── */
function SuccessCard({ email }) {
  return (
    <div className="auth-card">
      <div className="success-card">
        <div className="check-icon"><CheckIcon /></div>
        <h2>Submitted for review</h2>
        <p>We'll verify your university and get back to you within 48 hours.</p>
        <div className="email-highlight">{email || 'your email'}</div>
        <p style={{ marginBottom: 24 }}>Check your inbox for a confirmation.</p>
        <a className="back-link" href="/">← Back to homepage</a>
      </div>
    </div>
  );
}

/* ── Verify Form ──────────────────────────────────────────────── */
function VerifyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    instName: '',
    country: '',
    city: '',
    website: '',
    type: '',
    accreditation: '',
  });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const allFilled = form.fullName.trim() && form.email.trim() && form.instName.trim() && form.country && form.city.trim() && form.website.trim() && form.type;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allFilled) return;
    // In production this would POST to an API
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <>
        <Nav />
        <main className="auth-page">
          <SuccessCard email={form.email} />
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
            <div className="kicker"><i></i> Unrecognized email domain</div>
            <h1>Register your <em>university</em></h1>
            <p>We don't recognize your email domain yet. Tell us about your institution and we'll verify it.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field-row">
              <div className="field-group">
                <label htmlFor="full-name">Full name</label>
                <input
                  id="full-name"
                  type="text"
                  placeholder="Your full name"
                  value={form.fullName}
                  onChange={set('fullName')}
                  required
                  autoFocus
                  autoComplete="name"
                />
              </div>
              <div className="field-group">
                <label htmlFor="notify-email">Email for notification</label>
                <input
                  id="notify-email"
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={set('email')}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="inst-name">Institution name</label>
              <input
                id="inst-name"
                type="text"
                placeholder="e.g. Universiteti i Prishtinës"
                value={form.instName}
                onChange={set('instName')}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                value={form.country}
                onChange={set('country')}
                required
              >
                <option value="" disabled>Select country</option>
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                placeholder="e.g. Prishtina"
                value={form.city}
                onChange={set('city')}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="website">University website</label>
              <input
                id="website"
                type="url"
                placeholder="https://uni-pr.edu"
                value={form.website}
                onChange={set('website')}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="inst-type">Type of institution</label>
              <select
                id="inst-type"
                value={form.type}
                onChange={set('type')}
                required
              >
                <option value="" disabled>Select type</option>
                {INST_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="accreditation">Accreditation link or ID <span style={{ fontWeight: 400, opacity: 0.6, textTransform: 'none', letterSpacing: 0, fontSize: 10 }}>— optional</span></label>
              <input
                id="accreditation"
                type="text"
                placeholder="e.g. https://akreditimi.org/uni-pr or ID: AKA-2024-0142"
                value={form.accreditation}
                onChange={set('accreditation')}
              />
            </div>

            <label className="agree-row">
              <input
                type="checkbox"
                checked={form.agreed || false}
                onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
              />
              I agree to the <a href="terms.html" target="_blank">Terms of Service</a> and <a href="privacy.html" target="_blank">Privacy Policy</a>
            </label>

            <button
              type="submit"
              className="auth-submit"
              disabled={!allFilled || !form.agreed}
              style={(!allFilled || !form.agreed) ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              Submit for review <span>→</span>
            </button>
          </form>

          <div className="auth-terms" style={{ marginTop: 20 }}>
            We only use this information to verify your institution. <a href="privacy.html">Privacy Policy</a>
          </div>
        </div>
      </main>
      <PageFooter />
    </>
  );
}

/* ── mount ─────────────────────────────────────────────────────── */
ReactDOM.createRoot(document.getElementById('root')).render(<VerifyPage />);
