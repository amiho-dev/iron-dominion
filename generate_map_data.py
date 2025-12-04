import json
import math

def point_in_polygon(point, polygon):
    x, y = point
    inside = False
    n = len(polygon)
    p1x, p1y = polygon[0]
    for i in range(n + 1):
        p2x, p2y = polygon[i % n]
        if y > min(p1y, p2y):
            if y <= max(p1y, p2y):
                if x <= max(p1x, p2x):
                    if p1y != p2y:
                        xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                    if p1x == p2x or x <= xinters:
                        inside = not inside
        p1x, p1y = p2x, p2y
    return inside

def get_region(country_id):
    # Map country codes to regions
    na = ['USA', 'CAN', 'MEX', 'GRL', 'CUB', 'DOM', 'HTI', 'JAM', 'PRI', 'BHS']
    sa = ['BRA', 'ARG', 'PER', 'COL', 'BOL', 'VEN', 'CHL', 'PRY', 'ECU', 'GUY', 'URY', 'SUR']
    eu = ['FRA', 'DEU', 'GBR', 'ITA', 'ESP', 'UKR', 'POL', 'ROU', 'NLD', 'BEL', 'CZE', 'GRC', 'PRT', 'SWE', 'HUN', 'BLR', 'AUT', 'CHE', 'BGR', 'SRB', 'DNK', 'FIN', 'SVK', 'NOR', 'IRL', 'HRV', 'BIH', 'MDA', 'LTU', 'ALB', 'MKD', 'SVN', 'LVA', 'EST', 'MNE', 'LUX', 'MLT', 'ISL', 'AND', 'MCO', 'LIE', 'SMR', 'VAT']
    af = ['NGA', 'ETH', 'EGY', 'COD', 'ZAF', 'TZA', 'KEN', 'UGA', 'DZA', 'SDN', 'MAR', 'AGO', 'GHA', 'MOZ', 'MDG', 'CIV', 'CMR', 'NER', 'BFA', 'MLI', 'MWI', 'ZMB', 'SEN', 'TCD', 'SOM', 'ZWE', 'GIN', 'RWA', 'BEN', 'BDI', 'TUN', 'SSD', 'TGO', 'SLE', 'LBY', 'COG', 'LBR', 'CAF', 'MRT', 'ERI', 'NAM', 'GMB', 'BWA', 'GAB', 'LSO', 'GNB', 'GNQ', 'MUS', 'SWZ', 'DJI', 'COM', 'CPV', 'STP', 'SYC']
    ru = ['RUS', 'KAZ', 'BLR', 'KGZ', 'TJK'] # Eurasian Pact
    cn = ['CHN', 'MNG', 'PRK', 'VNM', 'LAO', 'KHM', 'MMR', 'THA'] # Dragon Alliance
    oc = ['AUS', 'NZL', 'PNG', 'FJI', 'SLB', 'VUT', 'NCL', 'PYF', 'WSM', 'GUM', 'KIR', 'TON', 'FSM']
    
    if country_id in na: return 'N'
    if country_id in sa: return 'S'
    if country_id in eu: return 'E'
    if country_id in af: return 'F'
    if country_id in ru: return 'R'
    if country_id in cn: return 'C'
    if country_id in oc: return 'O'
    
    # Default to Asia for others (Middle East, India, etc)
    return 'A'

with open('assets/world.json', 'r') as f:
    data = json.load(f)

width = 120
height = 60
grid = [['.' for _ in range(width)] for _ in range(height)]

# Hex grid logic
# q (col), r (row)
# We map x, y to lon, lat
# Lon: -180 to 180
# Lat: 90 to -90

for r in range(height):
    for q in range(width):
        # Convert grid to lat/lon
        # Simple equirectangular projection
        lon = (q / width) * 360 - 180
        lat = -((r / height) * 180 - 90)
        
        point = (lon, lat)
        
        found = False
        for feature in data['features']:
            geometry = feature['geometry']
            country_id = feature['id']
            
            if geometry['type'] == 'Polygon':
                polys = [geometry['coordinates']]
            elif geometry['type'] == 'MultiPolygon':
                polys = geometry['coordinates']
            else:
                continue
                
            for poly in polys:
                # GeoJSON polygons are list of rings, first is exterior
                if point_in_polygon(point, poly[0]):
                    region = get_region(country_id)
                    grid[r][q] = region
                    found = True
                    break
            if found: break

# Output as JS array
print("const ASCII_WORLD = [")
for row in grid:
    print(f'    "{ "".join(row) }",')
print("];")
