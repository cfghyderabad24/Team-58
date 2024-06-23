from fastapi import APIRouter, HTTPException, Query
from src.models.donors import get_donors, get_filter_list
from typing import List
from starlette import status
from src.routes.auth import user_dependency


router  = APIRouter()

@router.get("/v1/fetch-donors")
def fetch_donors(query: str= None, sector: List[str] = Query(None), state: List[str] = Query(None), district: List[str] = Query(None), mode_of_implentation : List[str] = Query(None), page_number : int = 1):
    results = get_donors(query, sector, state, district, mode_of_implentation, page_number)
    if results:
        return {"data" : results}
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No donors found")

@router.get("/v1/fetch-filters")
def get_filters(filter_name: str = None):
    filters = get_filter_list(filter_name)
    if filters:
        return {"details" : {"filters" : filters} }
    else:
        return {"details" : {"filters" : []} }


    