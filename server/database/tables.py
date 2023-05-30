from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class Person(Base):
    __tablename__ = "person"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    age: Mapped[int] = mapped_column(nullable=False)
    gender: Mapped[str] = mapped_column(nullable=False)
    city: Mapped[str] = mapped_column(nullable=False)
    education: Mapped[str] = mapped_column(nullable=False)
    city: Mapped[str] = mapped_column(nullable=False)
    origin_city: Mapped[str] = mapped_column(nullable=False)
    punjabi: Mapped[str] = mapped_column(nullable=False)


class Sentences(Base):
    __tablename__ = "sentences"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    sentence: Mapped[str] = mapped_column(nullable=False)
