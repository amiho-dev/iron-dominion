import urllib.request
import json
import os

# Use 10m resolution for more complete province data
url = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson"
output_path = "assets/provinces.json"

print(f"Attempting to download from {url}...")
print("This may take a moment (large file)...")

try:
    with urllib.request.urlopen(url, timeout=120) as response:
        data = response.read()
        
        # Verify it's valid JSON
        parsed = json.loads(data)
        print(f"Downloaded {len(parsed.get('features', []))} province features")
        
        # Count unique countries
        countries = set()
        for feat in parsed.get('features', []):
            code = feat.get('properties', {}).get('adm0_a3')
            if code:
                countries.add(code)
        print(f"Provinces span {len(countries)} countries")
        
        with open(output_path, "wb") as f:
            f.write(data)
    print(f"Successfully downloaded to {output_path}")
except Exception as e:
    print(f"Error downloading file: {e}")
    print("Trying alternative source...")
    
    # Fallback to another source
    alt_url = "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/10m/cultural/ne_10m_admin_1_states_provinces.json"
    try:
        with urllib.request.urlopen(alt_url, timeout=120) as response:
            data = response.read()
            with open(output_path, "wb") as f:
                f.write(data)
        print(f"Successfully downloaded from alternative source to {output_path}")
    except Exception as e2:
        print(f"Alternative source also failed: {e2}")
