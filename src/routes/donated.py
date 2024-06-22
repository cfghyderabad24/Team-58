from fastapi import APIRouter, HTTPException, Query
from src.models.donors import get_donors, get_filter_list
from typing import List
from starlette import status
from src.routes.auth import user_dependency
from src.schemas.donated import DonorBody
from src.models.donated import add_donor_data


router = APIRouter()



@router.post("/v1/feed-donor-data")
def feed_data(user: user_dependency, donor_body : DonorBody ):
    response = add_donor_data(donor_body)
    if response:
        return {"message" : "Data has been fed successfully"}
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Data could not be fed")