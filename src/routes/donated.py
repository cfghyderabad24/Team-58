from fastapi import APIRouter, HTTPException
from typing import List
from starlette import status
from src.routes.auth import user_dependency
from src.schemas.donated import DonorBody
from src.models.donated import add_donor_data, get_donated_users


router = APIRouter()



@router.post("/v1/feed-donor-data")
def feed_data(donor_body : DonorBody ):
    response = add_donor_data(donor_body)
    if response:
        return {"message" : "Data has been fed successfully"}
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Data could not be fed")
    
@router.get("/v1/fetch-donated-users")
def fetch_donated_users():
    response = get_donated_users()
    if response:
        return response
    else:
        raise HTTPException(status_code=404, detail="No data found")