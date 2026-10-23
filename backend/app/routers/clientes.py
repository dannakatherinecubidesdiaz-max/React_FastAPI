from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.database import get_db

router = APIRouter(prefix="/clientes", tags=["clientes"])
DatabaseSession = Annotated[Session, Depends(get_db)]


@router.post("", response_model=schemas.ClienteRead, status_code=status.HTTP_201_CREATED)
def create_cliente(
    cliente: schemas.ClienteCreate,
    db: DatabaseSession,
) -> models.Cliente:
    return crud.create_cliente(db, cliente)


@router.get("", response_model=list[schemas.ClienteRead])
def read_clientes(
    db: DatabaseSession,
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(ge=1, le=100)] = 100,
) -> list[models.Cliente]:
    return crud.get_clientes(db, skip=skip, limit=limit)


@router.get("/buscar", response_model=list[schemas.ClienteRead])
def search_clientes(
    db: DatabaseSession,
    q: Annotated[str, Query(min_length=1)],
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(ge=1, le=100)] = 100,
) -> list[models.Cliente]:
    return crud.get_clientes_by_search(db, q, skip=skip, limit=limit)


@router.get("/{cliente_id}", response_model=schemas.ClienteRead)
def read_cliente(cliente_id: int, db: DatabaseSession) -> models.Cliente:
    cliente = crud.get_cliente(db, cliente_id)
    if cliente is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cliente no encontrado")
    return cliente


@router.put("/{cliente_id}", response_model=schemas.ClienteRead)
def update_cliente(
    cliente_id: int,
    cliente: schemas.ClienteUpdate,
    db: DatabaseSession,
) -> models.Cliente:
    db_cliente = crud.get_cliente(db, cliente_id)
    if db_cliente is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cliente no encontrado")
    return crud.update_cliente(db, db_cliente, cliente)


@router.delete("/{cliente_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_cliente(cliente_id: int, db: DatabaseSession) -> Response:
    db_cliente = crud.get_cliente(db, cliente_id)
    if db_cliente is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cliente no encontrado")
    cita_existente = db.scalar(
        select(models.Cita.id).where(models.Cita.cliente_id == cliente_id).limit(1)
    )
    if cita_existente is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="No se puede eliminar un cliente con citas asociadas",
        )
    crud.delete_cliente(db, db_cliente)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
