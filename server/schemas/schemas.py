from pydantic import BaseModel


class GetPerson(BaseModel):
    gender: str
    age: int
    city: str
    education: str
