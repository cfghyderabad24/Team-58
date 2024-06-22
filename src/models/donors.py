from database import donors_collection
from bson import ObjectId
from typing import List

donors_projection = {
    "_id": {'$toString': "$_id"},
    "S.No": 1,
    "Company": 1,
    "CSR Project(s)": 1,
    "Development Sector(s)": 1,
    "State": 1,
    "District": 1,
    "Projected Amount Outlay(INR Cr.)": 1,
    "Amount Spent(INR Cr.)": 1,
    "Mode of Implementation": 1,
    "Year": 1
  }

def get_donors(query: None, sector: None, state: None, district: None, mode_of_implentation : None, page):
    page_size=9
    must_clauses = []
    filter_clauses = []
    should_clauses = []


    if sector:
        must_clauses.append({
            'text': {
                'query': sector,
                'path': 'Development Sector(s)'
            }
        })
    if state:
        must_clauses.append({
            'text': {
                'query': state,
                'path': 'State'
            }
        })
    if district:
         must_clauses.append({
            'text': {
                'query': district,
                'path': 'District'
            }
        })
    if mode_of_implentation:
         must_clauses.append({
            'text': {
                'query': mode_of_implentation,
                'path': 'Mode of Implementation'
            }
        })
        


    if query:
        should_clauses.append({

            'text': {
                'query': query,
                'path': ['Company', 'CSR Project(s)', 'Development Sector(s)', 'State', 'District', 'Mode of Implementation']
            }
        })

    minimumShouldMatch = 1 if len(should_clauses) > 0 else 0 

    aggregation_pipeline = [
        
        {
            '$search': {
                'index': "jaldhaarsearchindex",
                'compound': {
                    'filter': filter_clauses,
                    'must': must_clauses,
                    'should' : should_clauses,
                    'minimumShouldMatch':  minimumShouldMatch
                    
                }
            }
        },
        {'$project': donors_projection },
    ]


    aggregation_pipeline = [stage for stage in aggregation_pipeline if stage]

    events = list(donors_collection.aggregate(aggregation_pipeline))

    total_matchable_count = len(events)
    total_pages = total_matchable_count // page_size + (1 if total_matchable_count % page_size > 0 else 0)

    paginated_events = {i: [] for i in range(1, total_pages + 1)}
    for i in range(total_matchable_count):
        page_num = (i // page_size) + 1
        paginated_events[page_num].append(events[i])


    return {"events": paginated_events.get(page, []), "total_pages": total_pages}


def get_filter_list(filter_name):
    if filter_name == "Development Sector(s)" or filter_name == "State" or filter_name == "District" or filter_name == "Mode of Implementation":
        pipeline = [
            {
                '$group': {
                    '_id': f'${filter_name}',
                    'count': {'$sum': 1}
                }
            },
            {
                '$sort': {'count': -1}
            },
            {
                '$limit': 5
            },
            {
                '$project': {
                    '_id': 0,
                    f'{filter_name}': '$_id',
                    'count': 1
                }
            }
        ]

        result = [filter[filter_name] for filter in list(donors_collection.aggregate(pipeline))]
        return result
    else:
        return False
    

