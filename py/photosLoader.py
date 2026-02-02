import os
import json

# Use your actual folder names (lowercase as per your dir description)
# Remove the ../ because you are running the script from the Fallergy root
IMAGE_DIR = "Images/InstaScrollable"
JSON_FILE = "Images/InstaScrollable/instaScrollable.json"

photos = []
if os.path.exists(IMAGE_DIR):
    for filename in os.listdir(IMAGE_DIR):
        if filename.lower().endswith((".jpg", ".png", ".jpeg")): 
            photos.append({
                # This path must be relative to index.html
                "url": f"Images/InstaScrollable/{filename}",  
                "alt": os.path.splitext(filename)[0].replace("_", " ").title()
            })

    with open(JSON_FILE, "w") as f:
        json.dump(photos, f, indent=2)

    print(f"Generated {JSON_FILE} with {len(photos)} photos.")
else:
    print(f"Error: Directory {IMAGE_DIR} not found.")