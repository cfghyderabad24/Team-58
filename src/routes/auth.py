from fastapi import APIRouter, HTTPException
import hashlib
from random import randbytes
from fastapi import APIRouter, Depends, HTTPException
from datetime import timedelta, datetime, timezone
from typing import Union, Annotated
from starlette import status
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
import os
from dotenv import load_dotenv
load_dotenv()

from database import users_collections
from src.models.auth import is_user_exist
from bson import ObjectId
from src.schemas.auth import Token

router  = APIRouter()


SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')

oauth2_bearer = OAuth2PasswordBearer(tokenUrl='/v1/login')



@router.post("/v1/login", response_model=Union[Token, dict])
async def login_for_access_token(form_data : Annotated[OAuth2PasswordRequestForm, Depends()]):

    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="The email or password does not match. Only NGO admin has access to this login!")
    
    token = create_access_token(str(user['id']), timedelta(hours=2))
    return {"access_token" : token, "token_type" : 'bearer'}


def authenticate_user(email: str, password: str):
    user = is_user_exist(email)
    if not user:
        return False
    if not user['password'] == password:
        return False

    return user


def create_access_token(id : str, expires_delta : timedelta):
    encode = {'id' : id}
    expires = datetime.now(timezone.utc) + expires_delta
    encode.update({'exp' : expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: str = payload.get('id')
        exp : int = payload.get('exp')
        if id is None or exp is None:
            raise HTTPException(status_code=498, detail='Could not validate user.')
        current_time = datetime.now(timezone.utc)
        expiry_time = datetime.fromtimestamp(exp, timezone.utc)
        if expiry_time <= current_time:
            raise HTTPException(status_code=440, detail='The session is expired.')
        
        return {'id': id, 'exp' : exp}

    except JWTError:
        raise HTTPException(status_code=498, detail='Could not validate user.')
    
user_dependency = Annotated[dict, Depends(get_current_user)]