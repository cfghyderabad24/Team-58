import json
import requests

headers = {
    "Access-Control-Allow-Origin": "http://pdfbuilder.mca.gov.in",
    "Cache-Control": "max-age=0, no-cache, no-store",
    "Content-Encoding": "gzip",
    "Content-Security-Policy": "upgrade-insecure-requests; default-src 'self' https://pdfbuilder.mca.gov.in http://pdfbuilder.mca.gov.in http://mca.gov.in/ https://mca.gov.in/ http://www.mca.gov.in/ https://www.mca.gov.in/ http://mca21.gov.in/ https://mca21.gov.in/ http://www.mca21.gov.in/ https://www.mca21.gov.in/ https://www.mygov.in/ https://www.boportal.mca.gov.in/ http://www.boportal.mca.gov.in/ https://sso.mca.gov.in/ http://sso.mca.gov.in/ ; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net/npm/disable-devtool http://cdn.jsdelivr.net/npm/disable-devtool https://v3chat.mca.gov.in/ http://v3chat.mca.gov.in/ http://mca.gov.in/ https://mca.gov.in/ http://www.mca.gov.in/ https://www.mca.gov.in/ http://mca21.gov.in/ https://mca21.gov.in/ http://www.mca21.gov.in/ https://www.mca21.gov.in/ https://www.mygov.in/ http://www.feedrapp.info https://www.feedrapp.info https://feedrapp.info seal.entrust.net; img-src 'self' https://cbpssubscriber.mygov.in http://mca.gov.in/ https://mca.gov.in/ http://www.mca.gov.in/ https://www.mca.gov.in/ http://mca21.gov.in/ https://mca21.gov.in/ http://www.mca21.gov.in/ https://www.mca21.gov.in/ https://www.mygov.in/ seal.entrust.net data: blob: filesystem:;style-src 'self' 'unsafe-inline' http://mca.gov.in/ https://mca.gov.in/ http://www.mca.gov.in/ https://www.mca.gov.in/ http://mca21.gov.in/ https://mca21.gov.in/ http://www.mca21.gov.in/ https://www.mca21.gov.in/ https://www.mygov.in/; font-src 'self' http://mca.gov.in/ https://mca.gov.in/ http://www.mca.gov.in/ https://www.mca.gov.in/ http://mca21.gov.in/ https://mca21.gov.in/ http://www.mca21.gov.in/ https://www.mca21.gov.in/ https://www.mygov.in/; child-src 'self' http://mca.gov.in/ https://mca.gov.in/ http://www.mca.gov.in/ https://www.mca.gov.in/ http://mca21.gov.in/ https://mca21.gov.in/ http://www.mca21.gov.in/ https://www.mca21.gov.in/ https://www.mygov.in/; object-src 'self' http://mca.gov.in/ https://mca.gov.in/ http://www.mca.gov.in/ https://www.mca.gov.in/ http://mca21.gov.in/ https://mca21.gov.in/ http://www.mca21.gov.in/ https://www.mca21.gov.in/ https://www.mygov.in/; media-src 'self' blob: mediastream http://mca.gov.in/ https://mca.gov.in/ http://www.mca.gov.in/ https://www.mca.gov.in/ http://mca21.gov.in/ https://mca21.gov.in/ http://www.mca21.gov.in/ https://www.mca21.gov.in/ https://www.mygov.in/; connect-src 'self' https://pdfbuilder.mca.gov.in http://pdfbuilder.mca.gov.in http://www.mca.gov.in/ https://www.mca.gov.in/ wss: ws: https: ; frame-src 'self' https://www.facebook.com/ https://www.youtube.com/ http://www.feedrapp.info data: blob:",
    "Content-Type": "application/json;charset=utf-8",
    "Date": "Sun, 23 Jun 2024 00:46:47 GMT",
    "Expires": "Sun, 23 Jun 2024 00:46:47 GMT",
    "Pragma": "no-cache",
    "Referrer-Policy": "same-origin",
    "Vary": "Accept-Encoding, User-Agent",
    "X-Aem": "MCA",
    "X-Content-Type-Options": "nosniff",
    "X-Dispatcher": "1",
    "X-Frame-Options": "SAMEORIGIN",
    "X-Ua-Compatible": "IE=edge",
    "X-Xss-Protection": "1; mode=block",
    "Referer": "http://pdfbuilder.mca.gov.in",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

# Function to fetch and process data for a given page number
def process_companies_page(page_number):
    # API URL with parameters for page number
    companies_api_url = f"https://www.csr.gov.in/content/csr/global/master/home/home/csr-expenditure--geographical-distribution/companies.companiesDataApi.html?methodName=companies&fy=FY%202021-22&orderType=DESC&orderColumn=amnt_spent&pageSize=10&pageNumber={page_number}&_=1719101675036"

    # Send GET request to the API endpoint with headers
    response = requests.get(companies_api_url, headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        # Get the JSON response data
        data = response.json()

        # List to store company data with filtered results
        companies_with_data = []

        # Iterate through the companies list
        for company in data['data']['topcompanylst_data']:
            cin = company['cin']

            # Construct the URL for the second API
            company_api_url = f"https://www.mca.gov.in/content/csr/global/master/home/home/csr-expenditure--geographical-distribution/state/district/company.companyDataAPI.html?cin={cin}&fy=FY%202021-22"

            # Send GET request to the second API endpoint with headers
            response_company = requests.get(company_api_url, headers=headers)

            # Check if the request was successful
            if response_company.status_code == 200:
                # Get the JSON response data
                data_company = response_company.json()

                # Filter the data for 'Safe Drinking Water' or 'Sanitation'
                filtered_data = [entry for entry in data_company['cmpny_csr_detail']['data']['cmpny_csr_detail_data']
                                if entry.get('sector') in ["Safe Drinking Water", "Sanitation"]]

                # If there is filtered data, add to companies_with_data
                if filtered_data:
                    company_data = {
                        "company": company['name'],
                        "filtered_data": filtered_data
                    }
                    companies_with_data.append(company_data)
            else:
                print(f"Failed to retrieve data for {company['name']}. Status code:", response_company.status_code)
    else:
        print(f"Failed to retrieve companies list for page {page_number}. Status code:", response.status_code)
    
    return companies_with_data

# Number of pages to fetch (demo: 20 pages)
num_pages = 20

# List to store all companies with filtered data
all_companies_data = []

# Iterate through each page and process companies
for page in range(1, num_pages + 1):
    print(f"Processing page {page}...")
    companies_data = process_companies_page(page)
    all_companies_data.extend(companies_data)

# Save to JSON file
output_file = 'filtered_companies_data.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(all_companies_data, f, ensure_ascii=False, indent=4)

print(f"Filtered data saved to {output_file}")
