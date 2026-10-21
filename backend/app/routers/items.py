from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/items", tags=["items"])
DatabaseSession = Annotated[Session, Depends(get_db)]


@router.post(
    "",
    response_model=schemas.ItemRead,
    status_code=status.HTTP_201_CREATED,
    summary="Crear un artículo",
)
def create_item(item: schemas.ItemCreate, db: DatabaseSession) -> schemas.ItemRead:
    """Crea un artículo y devuelve el registro persistido."""
    return crud.create_item(db, item)


@router.get(
    "",
    response_model=list[schemas.ItemRead],
    summary="Listar artículos",
)
def read_items(
    db: DatabaseSession,
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(ge=1, le=100)] = 100,
) -> list[schemas.ItemRead]:
    """Devuelve artículos paginados mediante los parámetros skip y limit."""
    return crud.get_items(db, skip=skip, limit=limit)


@router.get(
    "/{item_id}",
    response_model=schemas.ItemRead,
    summary="Obtener un artículo",
)
def read_item(item_id: int, db: DatabaseSession) -> schemas.ItemRead:
    """Devuelve un artículo por ID o responde 404 si no existe."""
    db_item = crud.get_item(db, item_id)
    if db_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Artículo no encontrado")
    return db_item


@router.put(
    "/{item_id}",
    response_model=schemas.ItemRead,
    summary="Actualizar un artículo",
)
def update_item(
    item_id: int,
    item: schemas.ItemUpdate,
    db: DatabaseSession,
) -> schemas.ItemRead:
    """Reemplaza los campos editables del artículo indicado."""
    db_item = crud.get_item(db, item_id)
    if db_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Artículo no encontrado")
    return crud.update_item(db, db_item, item)


@router.delete(
    "/{item_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Eliminar un artículo",
)
def delete_item(item_id: int, db: DatabaseSession) -> Response:
    """Elimina el artículo indicado y responde 404 si no existe."""
    db_item = crud.get_item(db, item_id)
    if db_item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Artículo no encontrado")
    crud.delete_item(db, db_item)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
