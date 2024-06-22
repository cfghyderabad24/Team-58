from fastapi import APIRouter, HTTPException


router  = APIRouter()

@router.get("/v1/donors")
def get_donors():
    return {"donors": "donors"}


