import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #07080d;
    --panel: #0d0f18;
    --panel2: #11141f;
    --line: rgba(255,255,255,0.06);
    --line2: rgba(255,255,255,0.1);
    --text: #d8dce8;
    --dim: #4a5070;
    --blue: #4f7eff;
    --blue-glow: rgba(79,126,255,0.15);
    --red: #e84545;
    --red-glow: rgba(232,69,69,0.1);
    --amber: #d97706;
    --amber-glow: rgba(217,119,6,0.1);
    --green: #10b981;
    --green-glow: rgba(16,185,129,0.1);
  }

  html, body { height: 100%; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  /* vertical accent line on left edge */
  body::before {
    content: '';
    position: fixed;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, transparent 0%, var(--blue) 30%, var(--blue) 70%, transparent 100%);
    opacity: 0.4;
  }

  .wrap { max-width: 720px; margin: 0 auto; padding: 56px 32px 96px; }

  /* ── Navbar ── */
  .nav {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 64px;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 10px;
  }
  .nav-icon {
    width: 32px; height: 32px; border: 1.5px solid var(--blue);
    border-radius: 6px; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .nav-icon svg { width: 16px; height: 16px; fill: none; stroke: var(--blue); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .nav-name { font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 700; color: #fff; letter-spacing: -0.02em; }
  .nav-badge {
    font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--blue); background: var(--blue-glow);
    border: 1px solid rgba(79,126,255,0.25); padding: 3px 8px; border-radius: 3px;
  }

  /* ── Hero ── */
  .hero { margin-bottom: 48px; }

  .hero-eyebrow {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 24px;
    font-family: 'JetBrains Mono', monospace; font-size: 10px;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--dim);
  }
  .hero-eyebrow-line { width: 24px; height: 1px; background: var(--dim); }

  .hero h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(36px, 6vw, 56px);
    font-weight: 700; line-height: 1.05;
    letter-spacing: -0.04em; color: #fff;
    margin-bottom: 20px;
  }
  .hero h1 .accent { color: var(--blue); }

  .hero-desc {
    font-size: 15px; color: var(--dim); line-height: 1.75;
    font-weight: 400; max-width: 480px;
    border-left: 2px solid var(--line2); padding-left: 16px;
  }

  /* ── Panel ── */
  .panel {
    background: var(--panel); border: 1px solid var(--line);
    border-radius: 10px; padding: 24px; margin-bottom: 12px;
  }
  .panel-label {
    font-family: 'JetBrains Mono', monospace; font-size: 9px;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--blue);
    margin-bottom: 18px; display: flex; align-items: center; gap: 10px;
  }
  .panel-label::after { content: ''; flex: 1; height: 1px; background: rgba(79,126,255,0.2); }

  /* ── Upload ── */
  .dropzone {
    border: 1px dashed rgba(255,255,255,0.12); border-radius: 8px;
    padding: 28px 20px; text-align: center; position: relative; cursor: pointer;
    background: var(--panel2); transition: all 0.15s; margin-bottom: 16px;
  }
  .dropzone:hover { border-color: var(--blue); background: rgba(79,126,255,0.04); }
  .dropzone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
  .dropzone-icon {
    width: 36px; height: 36px; border: 1px solid var(--line2); border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 10px;
  }
  .dropzone-icon svg { width: 18px; height: 18px; stroke: var(--dim); fill: none; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
  .dropzone p { font-size: 13px; color: var(--dim); }
  .dropzone strong { color: var(--blue); font-weight: 500; }
  .file-chosen { color: var(--green) !important; font-family: 'JetBrains Mono', monospace; font-size: 11px !important; }

  .or-row {
    display: flex; align-items: center; gap: 12px;
    font-family: 'JetBrains Mono', monospace; font-size: 9px;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--dim);
    margin-bottom: 16px;
  }
  .or-row::before, .or-row::after { content: ''; flex: 1; height: 1px; background: var(--line); }

  textarea {
    width: 100%; background: var(--panel2); border: 1px solid var(--line);
    border-radius: 8px; padding: 14px 16px; color: var(--text);
    font-family: 'Inter', sans-serif; font-size: 13px; line-height: 1.7;
    resize: vertical; outline: none; transition: border-color 0.15s;
  }
  textarea:focus { border-color: rgba(79,126,255,0.4); }
  textarea::placeholder { color: var(--dim); }

  /* ── CTA button ── */
  .cta {
    width: 100%; margin-top: 14px; padding: 13px;
    background: var(--blue); color: #fff; border: none; border-radius: 8px;
    font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer;
    transition: all 0.15s;
  }
  .cta:hover { background: #6b93ff; box-shadow: 0 0 24px rgba(79,126,255,0.3); transform: translateY(-1px); }
  .cta:disabled { opacity: 0.35; cursor: not-allowed; transform: none; box-shadow: none; }

  /* ── Loading ── */
  .loader {
    display: flex; align-items: center; gap: 10px; padding: 14px 0;
    font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--blue);
    letter-spacing: 0.05em;
  }
  .spin {
    width: 14px; height: 14px; border: 1.5px solid rgba(79,126,255,0.2);
    border-top-color: var(--blue); border-radius: 50%; animation: rot 0.7s linear infinite;
  }
  @keyframes rot { to { transform: rotate(360deg); } }

  /* ── Summary ── */
  .grid3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 20px; }
  .stat {
    background: var(--panel); border: 1px solid var(--line);
    border-radius: 8px; padding: 16px 12px; text-align: center;
  }
  .stat.r { border-color: rgba(232,69,69,0.2); background: var(--red-glow); }
  .stat.a { border-color: rgba(217,119,6,0.2); background: var(--amber-glow); }
  .stat.g { border-color: rgba(16,185,129,0.2); background: var(--green-glow); }
  .stat-n { font-family: 'Space Grotesk', sans-serif; font-size: 30px; font-weight: 700; line-height: 1; margin-bottom: 4px; }
  .stat.r .stat-n { color: var(--red); }
  .stat.a .stat-n { color: var(--amber); }
  .stat.g .stat-n { color: var(--green); }
  .stat-l { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--dim); }

  /* ── Section label ── */
  .sec-label {
    font-family: 'JetBrains Mono', monospace; font-size: 9px;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--dim);
    margin-bottom: 12px; display: flex; align-items: center; gap: 10px;
  }
  .sec-label::after { content: ''; flex: 1; height: 1px; background: var(--line); }

  /* ── Clause card ── */
  .clause {
    background: var(--panel); border: 1px solid var(--line);
    border-radius: 10px; margin-bottom: 8px; overflow: hidden;
    animation: up 0.25s ease both;
  }
  @keyframes up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .clause.r { border-left: 2px solid var(--red); }
  .clause.a { border-left: 2px solid var(--amber); }
  .clause.g { border-left: 2px solid var(--green); }

  .c-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 16px; border-bottom: 1px solid var(--line); background: var(--panel2);
  }
  .tag {
    font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase; padding: 2px 8px; border-radius: 3px; border: 1px solid;
  }
  .tag.r { color: var(--red); border-color: rgba(232,69,69,0.3); background: var(--red-glow); }
  .tag.a { color: var(--amber); border-color: rgba(217,119,6,0.3); background: var(--amber-glow); }
  .tag.g { color: var(--green); border-color: rgba(16,185,129,0.3); background: var(--green-glow); }
  .c-num { font-family: 'JetBrains Mono', monospace; font-size: 9px; color: var(--dim); letter-spacing: 0.08em; }

  .c-body { padding: 16px; }
  .field { margin-bottom: 12px; }
  .field:last-child { margin-bottom: 0; }
  .f-key { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--dim); margin-bottom: 5px; }
  .f-val { font-size: 13px; line-height: 1.65; color: #8892aa; }
  .f-val.suggest { color: var(--blue); font-style: italic; }
  .divline { height: 1px; background: var(--line); margin: 12px 0; }

  /* ── Email ── */
  .email-wrap {
    background: var(--panel); border: 1px solid var(--line);
    border-radius: 10px; margin-top: 16px; overflow: hidden;
  }
  .email-top {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 16px; border-bottom: 1px solid var(--line); background: var(--panel2);
  }
  .email-top-label { font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--blue); }
  .copy-btn {
    font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 5px 12px; background: transparent; color: var(--dim); border: 1px solid var(--line);
    border-radius: 4px; cursor: pointer; transition: all 0.15s;
  }
  .copy-btn:hover { color: var(--blue); border-color: rgba(79,126,255,0.3); }
  .copy-btn.ok { color: var(--green); border-color: rgba(16,185,129,0.3); }
  .email-body { padding: 20px; white-space: pre-wrap; font-size: 13px; line-height: 1.8; color: #8892aa; }

  /* ── Email gen button ── */
  .email-btn {
    margin-top: 10px; padding: 11px 20px; display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: var(--blue); border: 1px solid rgba(79,126,255,0.3);
    border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 600;
    letter-spacing: 0.05em; text-transform: uppercase; cursor: pointer; transition: all 0.15s;
  }
  .email-btn:hover { background: var(--blue-glow); border-color: var(--blue); transform: translateY(-1px); }

  /* ── Footer ── */
  .footer {
    margin-top: 48px; padding-top: 20px; border-top: 1px solid var(--line);
    font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--dim);
    letter-spacing: 0.05em; display: flex; align-items: center; gap: 8px;
  }
`;
document.head.appendChild(style);

const ScaleIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 3v18M3 9l9-6 9 6M5 10l-2 5a5 5 0 0 0 10 0L11 10M13 10l-2 5a5 5 0 0 0 10 0L19 10"/>
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

export default function App() {
  const [docText, setDocText] = useState("");
  const [fileName, setFileName] = useState("");
  const [clauses, setClauses] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const [copied, setCopied] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const form = new FormData();
    form.append("file", file);
    setLoading("Extracting text...");
    try {
      const res = await axios.post(`${API}/upload`, form);
      setDocText(res.data.text);
    } catch { alert("Upload failed. Is the backend running?"); }
    setLoading("");
  };

  const handleAnalyze = async () => {
    if (!docText.trim()) return alert("Paste text or upload a PDF first.");
    setClauses([]); setEmail("");
    setLoading("Analyzing document...");
    try {
      const res = await axios.post(`${API}/analyze`, { text: docText });
      const raw = res.data.result.replace(/```json|```/g, "").trim();
      setClauses(JSON.parse(raw));
    } catch (err) { alert("Could not parse response. Check console."); console.error(err); }
    setLoading("");
  };

  const handleEmail = async () => {
    const risky = clauses.filter(c => c.risk_level === "High" || c.risk_level === "Medium").map(c => c.clause);
    if (!risky.length) return alert("No High/Medium risk clauses found.");
    setLoading("Drafting negotiation email...");
    try {
      const res = await axios.post(`${API}/email`, { clauses: risky });
      setEmail(res.data.email);
    } catch { alert("Failed to generate email."); }
    setLoading("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rc = { High: "r", Medium: "a", Low: "g" };
  const count = (l) => clauses.filter(c => c.risk_level === l).length;

  return (
    <div className="wrap">

      {/* Nav */}
      <nav className="nav">
        <div className="nav-logo">
          <div className="nav-icon">
            <img src="/logo.png" alt="Logo" style={{ width: "20px", height: "20px", objectFit: "contain" }} />
          </div>
          <span className="nav-name">ClauseGuard</span>
        </div>
        <span className="nav-badge">Legal AI</span>
      </nav>

      {/* Hero */}
      <div className="hero">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-line" />
          Contract Intelligence
        </div>
        <h1>Detect. Explain.<br /><span className="accent">Negotiate.</span></h1>
        <p className="hero-desc">
          Upload any contract or terms document — we flag risky clauses, translate legalese into plain English, and draft your negotiation response.
        </p>
      </div>

      {/* Input */}
      <div className="panel">
        <div className="panel-label">Input Document</div>
        <div className="dropzone">
          <input type="file" accept=".pdf" onChange={handleUpload} />
          <div className="dropzone-icon"><FileIcon /></div>
          {fileName
            ? <p className="file-chosen">✓ &nbsp;{fileName}</p>
            : <p><strong>Click to upload</strong> — PDF contract or policy</p>
          }
        </div>
        <div className="or-row">or</div>
        <textarea
          rows={6}
          placeholder="Paste your Terms & Conditions, contract, or privacy policy here..."
          value={docText}
          onChange={(e) => setDocText(e.target.value)}
        />
        <button className="cta" onClick={handleAnalyze} disabled={!!loading}>
          {loading ? "Processing..." : "Run Analysis →"}
        </button>
      </div>

      {loading && (
        <div className="loader">
          <div className="spin" /> {loading}
        </div>
      )}

      {clauses.length > 0 && (
        <>
          <div className="grid3">
            <div className="stat r"><div className="stat-n">{count("High")}</div><div className="stat-l">High Risk</div></div>
            <div className="stat a"><div className="stat-n">{count("Medium")}</div><div className="stat-l">Medium Risk</div></div>
            <div className="stat g"><div className="stat-n">{count("Low")}</div><div className="stat-l">Low Risk</div></div>
          </div>

          <div className="sec-label">Analysis Results</div>

          {clauses.map((c, i) => (
            <div key={i} className={`clause ${rc[c.risk_level] || "g"}`} style={{ animationDelay: `${i * 45}ms` }}>
              <div className="c-head">
                <span className={`tag ${rc[c.risk_level] || "g"}`}>{c.risk_level} Risk</span>
                <span className="c-num">CLAUSE {String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="c-body">
                <div className="field">
                  <div className="f-key">Original Text</div>
                  <div className="f-val">{c.clause}</div>
                </div>
                <div className="divline" />
                <div className="field">
                  <div className="f-key">Plain English</div>
                  <div className="f-val">{c.explanation}</div>
                </div>
                <div className="divline" />
                <div className="field">
                  <div className="f-key">Suggested Rewrite</div>
                  <div className="f-val suggest">{c.rewrite}</div>
                </div>
              </div>
            </div>
          ))}

          {!email && (
            <button className="email-btn" onClick={handleEmail} disabled={!!loading}>
              ✉ Generate Negotiation Email
            </button>
          )}

          {email && (
            <div className="email-wrap">
              <div className="email-top">
                <span className="email-top-label">Negotiation Email</span>
                <button className={`copy-btn ${copied ? "ok" : ""}`} onClick={handleCopy}>
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
              <div className="email-body">{email}</div>
            </div>
          )}
        </>
      )}

      <div className="footer">
        <span>⚠</span>
        AI-assisted analysis only — not legal advice. Consult a qualified lawyer for legal matters.
      </div>
    </div>
  );
}