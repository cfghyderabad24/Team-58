from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

mongo_client  = MongoClient(os.getenv("MONGO_URI"))
db = mongo_client["development"]
donors_collection = db["donors"]
users_collections = db["users"]
expenditurestats_collection = db['expenditurestats']