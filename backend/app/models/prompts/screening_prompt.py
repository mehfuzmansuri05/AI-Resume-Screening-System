from langchain_core.prompts import ChatPromptTemplate
from app.models.request_models import get_model
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel
from typing import List

class ResumeAnalysis(BaseModel):

    candidate_name: str
    job_role: str
    matching_skills: List[str]
    missing_skills: List[str]
    relevant_projects: List[str]
    strengths: List[str]
    areas_of_improvement: List[str]
    match_score: int
    recommendation: str


screening_prompt = ChatPromptTemplate.from_messages([

    (
        "system",
        """
You are an expert HR Recruiter, Technical Interviewer, and ATS (Applicant Tracking System) evaluator.

Your responsibility is to analyze a candidate's resume against the provided Job Description (JD).

Evaluation Rules:

1. Analyze the candidate's:
   - Technical Skills
   - Frameworks
   - Tools
   - Projects
   - Education
   - Certifications
   - Experience

2. Compare the resume with the job description and identify:
   - Matching Skills
   - Missing Skills
   - Relevant Projects
   - Candidate Strengths
   - Areas of Improvement

3. Match Score Guidelines:
   - 90-100 : Excellent Match
   - 75-89  : Strong Match
   - 60-74  : Moderate Match
   - 40-59  : Weak Match
   - Below 40 : Poor Match

4. Recommendation Rules:
   - Highly Recommended
   - Recommended
   - Consider for Interview
   - Not Recommended

5. Do not assume information that is not present in the resume.

6. Consider both explicitly mentioned skills and evidence from projects.

7. Keep the analysis professional, concise, and realistic.

8. Extract the candidate's name if available. If not available, return "Not Found".

9. Identify the most suitable job role based on the resume and job description.

{format_instructions}
"""
    ),

    (
        "human",
        """
Resume:

{resume_text}

Job Description:

{job_description}

Analyze the resume and return the response according to the required format.
"""
    )

])

parser = JsonOutputParser(

    pydantic_object=ResumeAnalysis
)


def analyze_resume(resume_text, job_description):

    model = get_model()

    chain = (
        screening_prompt.partial(
            format_instructions=parser.get_format_instructions()
        )
        | model
        | parser
    )

    result = chain.invoke({
        "resume_text": resume_text,
        "job_description": job_description
    })

    return result
