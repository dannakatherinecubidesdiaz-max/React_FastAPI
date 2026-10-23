from datetime import date, time
from typing import ClassVar

from pydantic import BaseModel, ConfigDict, Field, model_validator
from pydantic.alias_generators import to_camel


class ItemBase(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    description: str | None = Field(default=None, max_length=500)
    price: float = Field(ge=0, allow_inf_nan=False)


class ItemCreate(ItemBase):
    pass


class ItemUpdate(ItemBase):
    pass


class ItemRead(ItemBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


class ApiSchema(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        from_attributes=True,
        populate_by_name=True,
    )


class PartialUpdateSchema(ApiSchema):
    non_nullable_fields: ClassVar[tuple[str, ...]] = ()

    @model_validator(mode="after")
    def reject_null_for_required_fields(self) -> "PartialUpdateSchema":
        for field in self.non_nullable_fields:
            if field in self.model_fields_set and getattr(self, field) is None:
                raise ValueError(f"{field} no puede ser null")
        return self


class ServicioCreate(ApiSchema):
    nombre: str = Field(min_length=1, max_length=100)
    descripcion: str | None = Field(default=None, max_length=500)
    categoria: str = Field(default="", max_length=100)
    duracion_min: int = Field(ge=1)
    precio: float = Field(ge=0, allow_inf_nan=False)
    estilista_id: int | None = None
    estilista_nombre: str | None = Field(default=None, max_length=150)
    activo: bool = True


class ServicioUpdate(PartialUpdateSchema):
    non_nullable_fields = ("nombre", "categoria", "duracion_min", "precio", "activo")

    nombre: str | None = Field(default=None, min_length=1, max_length=100)
    descripcion: str | None = Field(default=None, max_length=500)
    categoria: str | None = Field(default=None, max_length=100)
    duracion_min: int | None = Field(default=None, ge=1)
    precio: float | None = Field(default=None, ge=0, allow_inf_nan=False)
    estilista_id: int | None = None
    estilista_nombre: str | None = Field(default=None, max_length=150)
    activo: bool | None = None


class ServicioRead(ServicioCreate):
    id: int


class ClienteCreate(ApiSchema):
    nombre: str = Field(min_length=1, max_length=150)
    telefono: str = Field(min_length=1, max_length=30)
    email: str | None = Field(default=None, max_length=254)
    favoritos: str | None = Field(default=None, max_length=500)


class ClienteUpdate(PartialUpdateSchema):
    non_nullable_fields = ("nombre", "telefono")

    nombre: str | None = Field(default=None, min_length=1, max_length=150)
    telefono: str | None = Field(default=None, min_length=1, max_length=30)
    email: str | None = Field(default=None, max_length=254)
    favoritos: str | None = Field(default=None, max_length=500)


class ClienteRead(ClienteCreate):
    id: int


class CitaCreate(ApiSchema):
    cliente_id: int
    servicio_id: int
    estilista_id: int | None = None
    agenda_id: int | None = None
    estilista_nombre: str | None = Field(default=None, max_length=150)
    fecha: date
    hora: time
    estado: str = Field(default="Pendiente", min_length=1, max_length=30)
    observaciones: str | None = Field(default=None, max_length=1000)
    precio: float | None = Field(default=None, ge=0, allow_inf_nan=False)


class CitaUpdate(PartialUpdateSchema):
    non_nullable_fields = ("cliente_id", "servicio_id", "fecha", "hora", "estado")

    cliente_id: int | None = None
    servicio_id: int | None = None
    estilista_id: int | None = None
    agenda_id: int | None = None
    estilista_nombre: str | None = Field(default=None, max_length=150)
    fecha: date | None = None
    hora: time | None = None
    estado: str | None = Field(default=None, min_length=1, max_length=30)
    observaciones: str | None = Field(default=None, max_length=1000)
    precio: float | None = Field(default=None, ge=0, allow_inf_nan=False)


class CitaRead(CitaCreate):
    id: int
    cliente_nombre: str = Field(
        validation_alias="cliente_nombre",
        serialization_alias="clienteNombre",
    )
    servicio_nombre: str = Field(
        validation_alias="servicio_nombre",
        serialization_alias="servicioNombre",
    )
