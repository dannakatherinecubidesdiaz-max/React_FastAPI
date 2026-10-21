from sqlalchemy import select
from sqlalchemy.orm import Session

from app import models, schemas


def create_item(db: Session, item: schemas.ItemCreate) -> models.Item:
    db_item = models.Item(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def get_items(db: Session, *, skip: int = 0, limit: int = 100) -> list[models.Item]:
    statement = select(models.Item).offset(skip).limit(limit)
    return list(db.scalars(statement).all())


def get_item(db: Session, item_id: int) -> models.Item | None:
    return db.get(models.Item, item_id)


def update_item(
    db: Session,
    db_item: models.Item,
    item: schemas.ItemUpdate,
) -> models.Item:
    for field, value in item.model_dump().items():
        setattr(db_item, field, value)
    db.commit()
    db.refresh(db_item)
    return db_item


def delete_item(db: Session, db_item: models.Item) -> None:
    db.delete(db_item)
    db.commit()
