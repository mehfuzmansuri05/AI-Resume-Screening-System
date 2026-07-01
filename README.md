# 🚀 AI Resume Screening System

An AI-powered Resume Screening System that analyzes resumes against a Job Description (JD) using Large Language Models (LLMs). The system provides ATS-style evaluation, skill matching, missing skills, project relevance, and hiring recommendations.

## 🌐 Live Demo

**Frontend:** https://ai-resume-screening-system-delta.vercel.app

**Backend API:** https://ai-resume-screening-system-ie3b.onrender.com

---

# 📌 Features

- 📄 Upload Resume (PDF)
- 🤖 AI Resume Analysis using LLM
- 🎯 ATS Match Score
- ✅ Matching Skills Detection
- ❌ Missing Skills Detection
- 📂 Relevant Projects Extraction
- 💪 Candidate Strengths
- 📈 Areas of Improvement
- 💼 Job Recommendation
- ⚡ FastAPI Backend
- ⚛️ React + Vite Frontend

---

# 🛠 Tech Stack

### Frontend

- React.js
- Vite
- Axios
- CSS

### Backend

- FastAPI
- Python
- LangChain
- Groq API
- Pydantic
- PyPDF

### Deployment

- Vercel
- Render

---

# 📂 Project Structure

```
AI-Resume-Screening-System
│
├── backend
│   ├── app
│   │   ├── data
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── main.py
│   ├── uploads
│   └── requirements.txt
│
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/mehfuzmansuri05/AI-Resume-Screening-System.git

cd AI-Resume-Screening-System
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Create `.env`

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🚀 API Endpoint

## Upload Resume

```
POST /upload
```

Request

- Resume PDF
- Job Description

Response

```json
{
  "candidate_name": "John Doe",
  "job_role": "Backend Developer",
  "match_score": 87,
  "matching_skills": [],
  "missing_skills": [],
  "strengths": [],
  "areas_of_improvement": [],
  "recommendation": "Recommended"
}
```

---

# 📸 Screenshots

## Home Screen

(Add Screenshot Here)

---

## Resume Upload

(Add Screenshot Here)

---

## AI Analysis Result

(Add Screenshot Here)

---

# 🔮 Future Improvements

- Authentication
- Resume History
- Multiple Resume Comparison
- JD Upload via PDF
- Admin Dashboard
- Resume Ranking
- Multi-LLM Support
- Export Report (PDF)

---

# 👨‍💻 Author

**Mehfooz Mansuri**

GitHub

https://github.com/mehfuzmansuri05

LinkedIn

(Add Your LinkedIn Profile)

---

# ⭐ Support

If you like this project, don't forget to give it a ⭐ on GitHub.
