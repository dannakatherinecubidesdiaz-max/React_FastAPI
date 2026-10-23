from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.database import get_db

router = APIRouter(prefix="/servicios", tags=["servicios"])
DatabaseSession = Annotated[Session, Depends(get_db)]


@router.post("", response_model=schemas.ServicioRead, status_code=status.HTTP_201_CREATED)
def create_servicio(
    servicio: schemas.ServicioCreate,
    db: DatabaseSession,
) -> models.Servicio:
    return crud.create_servicio(db, servicio)


@router.get("", response_model=list[schemas.ServicioRead])
def read_servicios(
    db: DatabaseSession,
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(ge=1, le=100)] = 100,
) -> list[models.Servicio]:
    return crud.get_servicios(db, skip=skip, limit=limit)


@router.get("/{servicio_id}", response_model=schemas.ServicioRead)
def read_servicio(servicio_id: int, db: DatabaseSession) -> models.Servicio:
    servicio = crud.get_servicio(db, servicio_id)
    if servicio is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Servicio no encontrado")
    return servicio


@router.put("/{servicio_id}", response_model=schemas.ServicioRead)
def update_servicio(
    servicio_id: int,
    servicio: schemas.ServicioUpdate,
    db: DatabaseSession,
) -> models.Servicio:
    db_servicio = crud.get_servicio(db, servicio_id)
    if db_servicio is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Servicio no encontrado")
    return crud.update_servicio(db, db_servicio, servicio)


@router.delete("/{servicio_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_servicio(servicio_id: int, db: DatabaseSession) -> Response:
    db_servicio = crud.get_servicio(db, servicio_id)
    if db_servicio is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Servicio no encontrado")
    cita_existente = db.scalar(
        select(models.Cita.id).where(models.Cita.servicio_id == servicio_id).limit(1)
    )
    if cita_existente is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="No se puede eliminar un servicio con citas asociadas",
        )
    crud.delete_servicio(db, db_servicio)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
