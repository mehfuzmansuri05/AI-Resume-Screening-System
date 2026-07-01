import { useState } from "react";
import axios from "axios";
import "./App.css";

const JOB_DESCRIPTIONS = {
  "AI/ML Engineer": `
Python
Machine Learning
Deep Learning
FastAPI
SQL
LangChain
`,

  "Frontend Developer": `
HTML
CSS
JavaScript
React
Redux
Git
`,

  "Backend Developer": `
Python
FastAPI
Django
SQL
REST API
Docker
`,
};

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setResumeFile(file);
      } else {
        alert("Please upload a PDF file only.");
      }
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setResumeFile(file);
      } else {
        alert("Please upload a PDF file only.");
      }
    }
  };

  const clearFile = (e) => {
    e.stopPropagation();
    setResumeFile(null);
  };

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription) {
      alert("Please upload resume and select/write job description");
      return;
    }

    const formData = new FormData();
    formData.append("file", resumeFile);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);
      setResult(null); // Clear previous results to trigger loading skeletons nicely

      const response = await axios.post(
        "https://ai-resume-screening-system-ie3b.onrender.com/upload",
        formData
      );

      setResult(response.data);
    } catch (error) {
      console.log(error);
      alert("Error analyzing resume");
    } finally {
      setLoading(false);
    }
  };

  const score = result?.final_result?.match_score || 0;

  const stars =
    score >= 90
      ? "★★★★★"
      : score >= 80
      ? "★★★★☆"
      : score >= 70
      ? "★★★☆☆"
      : score >= 60
      ? "★★☆☆☆"
      : "★☆☆☆☆";

  // Formatter for displaying file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // SVG Gauge calculations
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.16
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getGaugeColor = (val) => {
    if (val >= 80) return "#10b981"; // Success (green)
    if (val >= 60) return "#f59e0b"; // Warning (orange)
    return "#f43f5e"; // Error (rose/red)
  };

  const getScoreBadgeClass = (val) => {
    if (val >= 80) return "score-excellent";
    if (val >= 60) return "score-good";
    return "score-low";
  };

  const getScoreText = (val) => {
    if (val >= 80) return "Excellent Match";
    if (val >= 60) return "Good Match";
    return "Needs Improvement";
  };

  return (
    <div className="app-container">
      {/* Header section - SaaS minimal layout */}
      <header className="header-section">
        <div className="system-badge" style={{ justifyContent: "center" }}>
          <span className="system-badge-dot"></span>
          Recruiter Intelligence // ATS Engine
        </div>
        <h1 className="title-gradient">AI Resume Screening System</h1>
        <p className="subtitle">
          Smart Candidate Evaluation Powered by AI
        </p>
        <div className="hero-badges">
          <span className="hero-badge">
            <svg className="badge-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            ATS Analysis
          </span>
          <span className="hero-badge">
            <svg className="badge-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            AI Powered
          </span>
          <span className="hero-badge">
            <svg className="badge-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Resume Intelligence
          </span>
        </div>
      </header>

      {/* Main recruiter split screen workspace */}
      <main className="dashboard-layout">
        {/* Left Side: Parameters Form Panel */}
        <section className="glass-panel interactive">
          <h2 className="panel-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            Screening Criteria
          </h2>

          {/* Drag & Drop File Input */}
          <div className="form-group">
            <label className="form-label">Applicant Resume (PDF)</label>
            {!resumeFile ? (
              <div
                className={`upload-dropzone ${dragActive ? "drag-active" : ""}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf"
                  className="file-input-hidden"
                  onChange={handleFileChange}
                />
                <div className="upload-icon-container">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
                    <path d="M12 12v9"/>
                    <path d="m8 16 4-4 4 4"/>
                  </svg>
                </div>
                <div className="upload-text-main">Drop candidate PDF here</div>
                <div className="upload-text-sub">or click to browse filesystem</div>
              </div>
            ) : (
              <div className="selected-file-card">
                <div className="file-info">
                  <div className="file-icon-wrapper">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                    </svg>
                  </div>
                  <div className="file-details">
                    <div className="file-name-text" title={resumeFile.name}>
                      {resumeFile.name}
                    </div>
                    <div className="file-size-text">
                      {formatFileSize(resumeFile.size)}
                    </div>
                  </div>
                </div>
                <button
                  className="remove-file-button"
                  onClick={clearFile}
                  title="Remove resume"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Job Role select */}
          <div className="form-group">
            <label className="form-label">Job Category / Role</label>
            <select
              value={selectedRole}
              className="custom-select"
              onChange={(e) => {
                const role = e.target.value;
                setSelectedRole(role);
                if (role && role !== "Custom Job Description") {
                  setJobDescription(JOB_DESCRIPTIONS[role].trim());
                } else {
                  setJobDescription("");
                }
              }}
            >
              <option value="">Select Target Profile</option>
              <option value="AI/ML Engineer">AI/ML Engineer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Custom Job Description">Custom Job Description</option>
            </select>
          </div>

          {/* Job Description Textarea */}
          <div className="form-group">
            <label className="form-label">Matching Requirements</label>
            <textarea
              placeholder="Input skill keywords or full role requirements..."
              className="custom-textarea"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {/* Action Trigger */}
          <button
            className="submit-btn"
            onClick={handleAnalyze}
            disabled={loading || !resumeFile || !jobDescription}
          >
            {loading ? (
              <>
                <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
                Run Match Analysis
              </>
            )}
          </button>
        </section>

        {/* Right Side: Scorecard dashboard / status panels */}
        <section className="glass-panel">
          {/* STATE 1: Empty state recruiter overview */}
          {!result && !loading && (
            <div className="empty-state-panel">
              <svg className="empty-state-illustration" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                <path d="M10 9H8"/>
                <path d="M16 13H8"/>
                <path d="M16 17H8"/>
              </svg>
              <h3 className="empty-state-title">Awaiting Candidate Document</h3>
              <p className="empty-state-desc">
                Once you select an applicant's resume and click Analyze, the screening matrix dashboard will display here.
              </p>
            </div>
          )}

          {/* STATE 2: Loader skeletons */}
          {loading && (
            <div className="skeleton-panel">
              <div className="pulse-skeleton skeleton-header"></div>
              <div className="pulse-skeleton skeleton-score"></div>
              <div className="pulse-skeleton skeleton-text-lg"></div>
              <div className="skeleton-grid">
                <div className="pulse-skeleton skeleton-card"></div>
                <div className="pulse-skeleton skeleton-card"></div>
              </div>
              <div className="pulse-skeleton skeleton-card" style={{ height: "110px" }}></div>
            </div>
          )}

          {/* STATE 3: Complete Recruiter Scorecard */}
          {result && !loading && (
            <div className="results-container">
              {/* Central ATS Score gauge card */}
              <div className="score-panel-card">
                <span className="detail-card-title" style={{ marginBottom: "8px" }}>ATS Fit Index</span>
                
                <div className="gauge-container">
                  <svg className="gauge-svg" viewBox="0 0 120 120">
                    <circle className="gauge-track" cx="60" cy="60" r={radius} />
                    <circle
                      className="gauge-fill"
                      cx="60"
                      cy="60"
                      r={radius}
                      stroke={getGaugeColor(score)}
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                    />
                  </svg>
                  <div className="gauge-text-container">
                    <div className="gauge-number">{score}</div>
                    <div className="gauge-pct">%</div>
                    <div className="gauge-label">Match</div>
                  </div>
                </div>

                <div className={`score-badge ${getScoreBadgeClass(score)}`}>
                  {getScoreText(score)}
                </div>

                <div className="stars-rating" title={`${score}% match score`}>
                  {stars}
                </div>

                <p className="score-explanation">
                  This score computes candidate alignment based on keyword matching density, missing skills checklist, and profile highlights.
                </p>
              </div>

              {/* Candidate Info Grid */}
              <div className="details-grid">
                <div className="detail-card">
                  <h3 className="detail-card-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle', position: 'relative', top: '-1px' }}>
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Applicant Name
                  </h3>
                  <div className="detail-card-val">
                    {result.final_result?.candidate_name || "N/A"}
                  </div>
                </div>

                <div className="detail-card">
                  <h3 className="detail-card-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle', position: 'relative', top: '-1px' }}>
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                    Target Profile
                  </h3>
                  <div className="detail-card-val">
                    {result.final_result?.job_role || "N/A"}
                  </div>
                </div>
              </div>

              {/* Recruitment recommendation summary */}
              <div className="detail-card">
                <h3 className="detail-card-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle', position: 'relative', top: '-1px' }}>
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <path d="m10 13 2 2 4-4"/>
                  </svg>
                  System Assessment
                </h3>
                <p className="recommendation-text">
                  {result.final_result?.recommendation || "No assessment was generated."}
                </p>
              </div>

              {/* Resume text summary preview */}
              <div className="detail-card">
                <h3 className="detail-card-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle', position: 'relative', top: '-1px' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                  Resume Content Summary
                </h3>
                <div className="resume-summary-container">
                  {result.resume_text || "No resume text content parsed."}
                </div>
              </div>

              {/* Dynamic skills matrix */}
              <div className="details-grid">
                <div className="detail-card">
                  <h3 className="detail-card-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle', position: 'relative', top: '-1px' }}>
                      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                    </svg>
                    Matching Skills
                  </h3>
                  <div className="skills-tags-list">
                    {result.final_result?.matching_skills && result.final_result.matching_skills.length > 0 ? (
                      result.final_result.matching_skills.map((skill, index) => (
                        <span key={index} className="skill-pill matching">
                          <span className="skill-bullet"></span>
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="file-size-text" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        None identified
                      </span>
                    )}
                  </div>
                </div>

                <div className="detail-card">
                  <h3 className="detail-card-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle', position: 'relative', top: '-1px' }}>
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    Missing Skills
                  </h3>
                  <div className="skills-tags-list">
                    {result.final_result?.missing_skills && result.final_result.missing_skills.length > 0 ? (
                      result.final_result.missing_skills.map((skill, index) => (
                        <span key={index} className="skill-pill missing">
                          <span className="skill-bullet"></span>
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="file-size-text" style={{ fontSize: "0.8rem", color: "var(--color-success)" }}>
                        Fully compliant fit
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bulleted strengths highlights */}
              <div className="detail-card">
                <h3 className="detail-card-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle', position: 'relative', top: '-1px' }}>
                    <circle cx="12" cy="8" r="7"/>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                  </svg>
                  Candidate Strengths
                </h3>
                <ul className="strengths-list">
                  {result.final_result?.strengths && result.final_result.strengths.length > 0 ? (
                    result.final_result.strengths.map((item, index) => (
                      <li key={index} className="strength-item">
                        <svg className="strength-checkmark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="strength-item" style={{ color: "var(--text-muted)" }}>
                      No strengths explicitly highlighted.
                    </li>
                  )}
                </ul>
              </div>

              {/* Areas of Improvement */}
              <div className="detail-card">
                <h3 className="detail-card-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle', position: 'relative', top: '-1px' }}>
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  Areas of Improvement
                </h3>
                <ul className="strengths-list">
                  {result.final_result?.areas_of_improvement && result.final_result.areas_of_improvement.length > 0 ? (
                    result.final_result.areas_of_improvement.map((item, index) => (
                      <li key={index} className="strength-item">
                        <svg className="strength-checkmark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 9v4"/>
                          <path d="M12 17h.01"/>
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="strength-item" style={{ color: "var(--text-muted)" }}>
                      No significant areas of improvement identified.
                    </li>
                  )}
                </ul>
              </div>

              {/* Relevant Projects */}
              {result.final_result?.relevant_projects && result.final_result.relevant_projects.length > 0 && (
                <div className="detail-card">
                  <h3 className="detail-card-title">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', verticalAlign: 'middle', position: 'relative', top: '-1px' }}>
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    </svg>
                    Relevant Projects
                  </h3>
                  <ul className="strengths-list">
                    {result.final_result.relevant_projects.map((project, index) => (
                      <li key={index} className="strength-item">
                        <svg className="strength-checkmark" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;