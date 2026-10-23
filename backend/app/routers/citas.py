from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.database import get_db

router = APIRouter(prefix="/citas", tags=["citas"])
DatabaseSession = Annotated[Session, Depends(get_db)]


def validate_references(
    db: Session,
    *,
    cliente_id: int | None = None,
    servicio_id: int | None = None,
) -> None:
    if cliente_id is not None and crud.get_cliente(db, cliente_id) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cliente no encontrado")
    if servicio_id is not None and crud.get_servicio(db, servicio_id) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Servicio no encontrado")


@router.post("", response_model=schemas.CitaRead, status_code=status.HTTP_201_CREATED)
def create_cita(cita: schemas.CitaCreate, db: DatabaseSession) -> models.Cita:
    validate_references(db, cliente_id=cita.cliente_id, servicio_id=cita.servicio_id)
    return crud.create_cita(db, cita)


@router.get("", response_model=list[schemas.CitaRead])
def read_citas(
    db: DatabaseSession,
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(ge=1, le=100)] = 100,
) -> list[models.Cita]:
    return crud.get_citas(db, skip=skip, limit=limit)


@router.get("/cliente/{cliente_id}", response_model=list[schemas.CitaRead])
def read_citas_by_cliente(
    cliente_id: int,
    db: DatabaseSession,
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(ge=1, le=100)] = 100,
) -> list[models.Cita]:
    if crud.get_cliente(db, cliente_id) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cliente no encontrado")
    return crud.get_citas_by_cliente(db, cliente_id, skip=skip, limit=limit)


@router.get("/{cita_id}", response_model=schemas.CitaRead)
def read_cita(cita_id: int, db: DatabaseSession) -> models.Cita:
    cita = crud.get_cita(db, cita_id)
    if cita is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cita no encontrada")
    return cita


@router.put("/{cita_id}", response_model=schemas.CitaRead)
def update_cita(
    cita_id: int,
    cita: schemas.CitaUpdate,
    db: DatabaseSession,
) -> models.Cita:
    db_cita = crud.get_cita(db, cita_id)
    if db_cita is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cita no encontrada")
    cambios = cita.model_dump(exclude_unset=True)
    validate_references(
        db,
        cliente_id=cambios.get("cliente_id"),
        servicio_id=cambios.get("servicio_id"),
    )
    return crud.update_cita(db, db_cita, cita)


@router.delete("/{cita_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_cita(cita_id: int, db: DatabaseSession) -> Response:
    cita = crud.get_cita(db, cita_id)
    if cita is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cita no encontrada")
    crud.delete_cita(db, cita)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
