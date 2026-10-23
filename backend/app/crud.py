from sqlalchemy import or_, select
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


def create_servicio(db: Session, servicio: schemas.ServicioCreate) -> models.Servicio:
    db_servicio = models.Servicio(**servicio.model_dump())
    db.add(db_servicio)
    db.commit()
    db.refresh(db_servicio)
    return db_servicio


def get_servicios(
    db: Session,
    *,
    skip: int = 0,
    limit: int = 100,
) -> list[models.Servicio]:
    statement = select(models.Servicio).order_by(models.Servicio.id).offset(skip).limit(limit)
    return list(db.scalars(statement).all())


def get_servicio(db: Session, servicio_id: int) -> models.Servicio | None:
    return db.get(models.Servicio, servicio_id)


def update_servicio(
    db: Session,
    db_servicio: models.Servicio,
    servicio: schemas.ServicioUpdate,
) -> models.Servicio:
    for field, value in servicio.model_dump(exclude_unset=True).items():
        setattr(db_servicio, field, value)
    db.commit()
    db.refresh(db_servicio)
    return db_servicio


def delete_servicio(db: Session, db_servicio: models.Servicio) -> None:
    db.delete(db_servicio)
    db.commit()


def create_cliente(db: Session, cliente: schemas.ClienteCreate) -> models.Cliente:
    db_cliente = models.Cliente(**cliente.model_dump())
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente


def get_clientes(
    db: Session,
    *,
    skip: int = 0,
    limit: int = 100,
) -> list[models.Cliente]:
    statement = select(models.Cliente).order_by(models.Cliente.id).offset(skip).limit(limit)
    return list(db.scalars(statement).all())


def get_clientes_by_search(
    db: Session,
    search: str,
    *,
    skip: int = 0,
    limit: int = 100,
) -> list[models.Cliente]:
    pattern = f"%{search}%"
    statement = (
        select(models.Cliente)
        .where(
            or_(
                models.Cliente.nombre.ilike(pattern),
                models.Cliente.email.ilike(pattern),
            )
        )
        .order_by(models.Cliente.id)
        .offset(skip)
        .limit(limit)
    )
    return list(db.scalars(statement).all())


def get_cliente(db: Session, cliente_id: int) -> models.Cliente | None:
    return db.get(models.Cliente, cliente_id)


def update_cliente(
    db: Session,
    db_cliente: models.Cliente,
    cliente: schemas.ClienteUpdate,
) -> models.Cliente:
    for field, value in cliente.model_dump(exclude_unset=True).items():
        setattr(db_cliente, field, value)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente


def delete_cliente(db: Session, db_cliente: models.Cliente) -> None:
    db.delete(db_cliente)
    db.commit()


def create_cita(db: Session, cita: schemas.CitaCreate) -> models.Cita:
    db_cita = models.Cita(**cita.model_dump())
    db.add(db_cita)
    db.commit()
    db.refresh(db_cita)
    return db_cita


def get_citas(
    db: Session,
    *,
    skip: int = 0,
    limit: int = 100,
) -> list[models.Cita]:
    statement = select(models.Cita).order_by(models.Cita.fecha, models.Cita.hora).offset(skip).limit(limit)
    return list(db.scalars(statement).all())


def get_citas_by_cliente(
    db: Session,
    cliente_id: int,
    *,
    skip: int = 0,
    limit: int = 100,
) -> list[models.Cita]:
    statement = (
        select(models.Cita)
        .where(models.Cita.cliente_id == cliente_id)
        .order_by(models.Cita.fecha, models.Cita.hora)
        .offset(skip)
        .limit(limit)
    )
    return list(db.scalars(statement).all())


def get_cita(db: Session, cita_id: int) -> models.Cita | None:
    return db.get(models.Cita, cita_id)


def update_cita(
    db: Session,
    db_cita: models.Cita,
    cita: schemas.CitaUpdate,
) -> models.Cita:
    for field, value in cita.model_dump(exclude_unset=True).items():
        setattr(db_cita, field, value)
    db.commit()
    db.refresh(db_cita)
    return db_cita


def delete_cita(db: Session, db_cita: models.Cita) -> None:
    db.delete(db_cita)
    db.commit()
