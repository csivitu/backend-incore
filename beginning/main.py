from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}










class Item(BaseModel):
    name: str

@app.post("/")
async def postroot(item: Item):
    print(item.json())
    return {"received_data": item}