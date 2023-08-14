from fastapi import FastAPI
import uvicorn
from api.airports.controller import router as airport_router
from api.flights.controller import router as flight_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(airport_router, tags=["airports"])
app.include_router(flight_router, tags=["flights"])                                   

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=4000)
