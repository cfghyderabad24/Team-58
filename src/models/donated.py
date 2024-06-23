from database import donated_collection
from datetime import datetime, timedelta, timezone
from pymongo import DESCENDING

donators_projection = {
    "_id": {'$toString': "$_id"},
    "first_name": 1,
    "last_name": 1,
    "company_name": 1,
    "address": 1,
    "contact_number": 1,
    "alternate_contact_number": 1,
    "pan_number": 1,
    "donation_amount": 1,
    "created_at": 1
}

def add_donor_data(donor_data):
    d = donor_data
    response = donated_collection.insert_one({
        'first_name' : d.first_name, 
        "last_name" : d.first_name, 
        "company_name" : d.company_name, 
        "address" : d.address, 
        "contact_number" : d.contact_number, 
        "alternate_contact_number" : d.alternate_contact_number, 
        "pan_number" : d.pan_number, 
        "donation_amount" : d.donation_amount, 
        "created_at" : datetime.now(timezone.utc)
         })
    
    if response:
        return True
    return False

def get_donated_users():
    cursor = donated_collection.find({},donators_projection).sort('created_at', DESCENDING).limit(10)
    recent_donations = list(cursor)
    if recent_donations:
        return {"recent_donations": recent_donations}
    return False