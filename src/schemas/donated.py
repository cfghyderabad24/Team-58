from pydantic import BaseModel
from typing import Optional

class DonorBody(BaseModel):
    first_name : str
    last_name : str
    company_name : str
    address : str
    contact_number : int 
    alternate_contact_number : int 
    pan_number : int
    donation_amount : int