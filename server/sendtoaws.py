import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK with your service account credentials
cred = credentials.Certificate("path/to/your/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Access the Firestore database
db = firestore.client()

# Specify the Firestore collection you want to retrieve data from
collection_name = "your_collection_name"

# Retrieve all documents from the specified collection
docs = db.collection(collection_name).stream()

# Iterate through the documents and print their data
for doc in docs:
    doc_data = doc.to_dict()
    print(doc_data)
