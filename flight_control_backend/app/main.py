from fastapi import FastAPI
import uvicorn
from api.airports.controller import router as airport_router
from api.flights.controller import router as flight_router

app = FastAPI()

app.include_router(airport_router)
app.include_router(flight_router)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=4000)