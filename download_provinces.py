import urllib.request
import os

url = "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/110m/cultural/ne_110m_admin_1_states_provinces.json"
output_path = "assets/provinces.json"

print(f"Attempting to download from {url}...")

try:
    with urllib.request.urlopen(url) as response:
        data = response.read()
        with open(output_path, "wb") as f:
            f.write(data)
    print(f"Successfully downloaded to {output_path}")
except Exception as e:
    print(f"Error downloading file: {e}")
