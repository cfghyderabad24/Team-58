from database import expenditurestats_collection
from fastapi import APIRouter
from fastapi import HTTPException   
from src.models.expenditurestats import get_expenditure_stats

router = APIRouter()    

@router.get("/v1/fetch-expenditure-stats")
def get_expenditure(filter_name : str = None):
    response = get_expenditure_stats(filter_name)
    if response:
        return response
    elif response == False or None:
        raise HTTPException(status_code=404, detail="No data found")
    
