from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import auth
from src.routes import donors
from src.routes import expenditurestats
from src.routes import donated
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
app.include_router(expenditurestats.router)
app.include_router(donated.router)