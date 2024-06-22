from database import donated_collection



def add_donor_data(donor_data):
    d = donor_data
    response = donated_collection.insert_one({'first_name' : d.first_name, "last_name" : d.first_name, "company_name" : d.company_name, "address" : d.address, "contact_number" : d.contact_number, "alternate_contact_number" : d.alternate_contact_number, "pan_number" : d.pan_number, "donation_amount" : d.donation_amount})
    if response:
        return True
    return False