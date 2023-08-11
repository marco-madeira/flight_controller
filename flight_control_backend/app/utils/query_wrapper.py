import os
from arango import ArangoClient
from dotenv import load_dotenv

load_dotenv()
client  = ArangoClient(os.getenv("DATABASE_URL"))
db = client.db("Flight", username="root", password="openSesame")


def query_wrapper(query: str):
    results = db.aql.execute(query)
    result_dic  = {}
    for index, data in enumerate(results):
        result_dic[index] = data              
    return result_dic    
