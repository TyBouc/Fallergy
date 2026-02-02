import os
import json

# Path to your images folder (relative to the script)
IMAGE_DIR = "./Images/InstaScrollable"
JSON_FILE = "./Images/InstaScrollable/instaScrollable.json"

# List all jpg files in the directory
photos = []
for filename in os.listdir(IMAGE_DIR):
    if filename.lower().endswith(".jpg") or filename.lower().endswith(".png") or filename.lower().endswith(".jpeg"): 
        photos.append({
            "url": f"{IMAGE_DIR}/{filename}",  # path relative to your HTML
            "alt": os.path.splitext(filename)[0].replace("_", " ").title()  # nice alt text
        })

# Write to JSON
with open(JSON_FILE, "w") as f:
    json.dump(photos, f, indent=2)

print(f"Generated {JSON_FILE} with {len(photos)} photos.")