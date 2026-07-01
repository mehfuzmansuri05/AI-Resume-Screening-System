from fastapi import APIRouter, UploadFile, File, Form,HTTPException
import shutil
from app.services.pdf_service import extract_text_from_pdf
from app.models.prompts.screening_prompt import analyze_resume

router = APIRouter()


@router.post("/upload")
def upload(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    
    if file.content_type != 'application/pdf':

        raise HTTPException(

            status_code=400,
            detail='Only PDF files are allowed'
        )
    
    if not job_description.strip():
        raise HTTPException(
            status_code=400,
            detail='Job Description cannot be empty'
        )

    file_path = f"uploads/{file.filename}"

    try:

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)


        resume_text = extract_text_from_pdf(file_path)
        
        if not resume_text.strip():
         raise HTTPException(
             status_code=400,
             detail='No text found in the uploaded PDF'
         )
   
        final_result = analyze_resume(resume_text,job_description)

        return {

            "message": "File uploaded successfully",
            "filename": file.filename,
            "job_description": job_description,
            "resume_text": resume_text,
            "final_result" : final_result
        }
    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal Server Error: {str(e)}"
        )