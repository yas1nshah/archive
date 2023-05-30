from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from .tables import Base


URL = "sqlite:///database.db"

engine = create_engine(URL)
SessionLocal = Session(bind=engine)

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal
    try:
        yield db
    finally:
        db.close()
