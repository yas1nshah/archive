from fastapi import Depends, FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

from sqlalchemy import select
from sqlalchemy.orm import Session

from database.database import get_db
from database.tables import Person, Sentences
from schemas.schemas import GetPerson


app = FastAPI()
app.mount("/web", StaticFiles(directory="../web"))
app.mount("/audios", StaticFiles(directory="../audios"))

# Website----------------------------------------------


# @app.get("/", response_class=HTMLResponse)
# async def mian():
#     with open("../index.html") as appHome:
#         responce = appHome.read()
#     return responce


# @app.get("/main.js", response_class=HTMLResponse)
# async def mian():
#     with open("../main.js") as appHome:
#         responce = appHome.read()
#     return responce


# @app.get("/style.css", response_class=HTMLResponse)
# async def mian():
#     with open("../style.css") as appHome:
#         responce = appHome.read()
# return responce

#  Api-------------------------------------------------


@app.get("/sentences")
async def new(db: Session = Depends(get_db)):

    stm = select(Sentences)
    result = db.scalars(stm).all()
    return result


@app.post('/persons')
async def get_person(req: GetPerson, db: Session = Depends(get_db)):
    print(req)
    stm = select(Person).where(Person.gender == req.gender,
                               Person.age == req.age,
                               Person.city == req.city,
                               Person.education == req.education)
    print(stm)
    result = db.scalars(stm).all()
    return result


# Post--------------------------------------------------

@app.post("/sen")
async def add(db: Session = Depends(get_db)):
    sentence = Sentences(sentence="helloo")
    db.add(sentence)
    db.commit()
    db.refresh(sentence)
    return sentence
