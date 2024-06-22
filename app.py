from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import auth
from src.routes import donors
import uvicorn

app = FastAPI()

origins = [
    "*",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(donors.router)