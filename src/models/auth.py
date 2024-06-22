from database import users_collections

user_projection = {
    "id": {'$toString': "$_id"},
    "email" : 1,
    "password" : 1,
}

def is_user_exist(email: str):
    return users_collections.find_one({'email' : email},  user_projection) 



