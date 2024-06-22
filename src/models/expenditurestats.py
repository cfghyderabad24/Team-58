from database import expenditurestats_collection
from bson import ObjectId
from datetime import datetime, timedelta

def get_expenditure_stats(filter_name):
    if filter_name == 'past_6_months':
        end_date = datetime.now()
        start_date = end_date - timedelta(days=180)  # 180 days for approximately 6 months

        pipeline = [
            # Match documents within the past 6 months
            {
                "$match": {
                    "DateTime": {"$gte": start_date, "$lte": end_date}
                }
            },
            {
                "$project": {
                    "monthYear": {"$dateToString": {"format": "%Y-%m", "date": "$DateTime"}},
                    "Expenditure": {"$toDouble": {"$trim": {"input": "$Expenditure", "chars": " Cr"}}},
                    "DonationReceived": {"$toDouble": {"$trim": {"input": "$DonationReceived", "chars": " Cr"}}}
                }
            },
            {
                "$group": {
                    "_id": "$monthYear",
                    "Expenditure": {"$sum": "$Expenditure"},
                    "DonationReceived": {"$sum": "$DonationReceived"}
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "monthYear": "$_id",
                    "Expenditure": {"$toString": "$Expenditure"},
                    "DonationReceived": {"$toString": "$DonationReceived"}
                }
            },
            {
                "$sort": {
                    "monthYear": 1  # Sort by monthYear ascending (1) or descending (-1)
                }
            }
        ]

        results = expenditurestats_collection.aggregate(pipeline)

        expenditure_stats = list(results)

        return expenditure_stats
    elif filter_name == "past_3_months":
        end_date = datetime.now()
        start_date = end_date - timedelta(days=90)  # 90 days for approximately 3 months

        pipeline = [
            # Match documents within the past 3 months
            {
                "$match": {
                    "DateTime": {"$gte": start_date, "$lte": end_date}
                }
            },
            {
                "$project": {
                    "monthYear": {"$dateToString": {"format": "%Y-%m", "date": "$DateTime"}},
                    "Expenditure": {"$toDouble": {"$trim": {"input": "$Expenditure", "chars": " Cr"}}},
                    "DonationReceived": {"$toDouble": {"$trim": {"input": "$DonationReceived", "chars": " Cr"}}}
                }
            },
            {
                "$group": {
                    "_id": "$monthYear",
                    "Expenditure": {"$sum": "$Expenditure"},
                    "DonationReceived": {"$sum": "$DonationReceived"}
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "monthYear": "$_id",
                    "Expenditure": {"$toString": "$Expenditure"},
                    "DonationReceived": {"$toString": "$DonationReceived"}
                }
            },
            {
                "$sort": {
                    "monthYear": 1  # Sort by monthYear ascending (1) or descending (-1)
                }
            }
        ]

        results = expenditurestats_collection.aggregate(pipeline)

        expenditure_stats = list(results)

        return expenditure_stats
    # Get the current year
    current_year = datetime.now().year

    # Define the start and end date for the current year
    start_date = datetime(current_year, 1, 1)
    end_date = datetime(current_year, 12, 31, 23, 59, 59)

    pipeline = [
        # Match documents within the current year
        {
            "$match": {
                "DateTime": {"$gte": start_date, "$lte": end_date}
            }
        },
        {
            "$project": {
                "monthYear": {"$dateToString": {"format": "%Y-%m", "date": "$DateTime"}},
                "Expenditure": {"$toDouble": {"$trim": {"input": "$Expenditure", "chars": " Cr"}}},
                "DonationReceived": {"$toDouble": {"$trim": {"input": "$DonationReceived", "chars": " Cr"}}}
            }
        },
        {
            "$group": {
                "_id": "$monthYear",
                "Expenditure": {"$sum": "$Expenditure"},
                "DonationReceived": {"$sum": "$DonationReceived"}
            }
        },
        {
            "$project": {
                "_id": 0,
                "monthYear": "$_id",
                "Expenditure": {"$toString": "$Expenditure"},
                "DonationReceived": {"$toString": "$DonationReceived"}
            }
        },
        {
            "$sort": {
                "monthYear": 1  # Sort by monthYear ascending (1) or descending (-1)
            }
        }
        
    ]

    results = expenditurestats_collection.aggregate(pipeline)

    expenditure_stats = list(results)

    return expenditure_stats