from datetime import date, time

from sqlalchemy import Boolean, Date, Float, ForeignKey, Integer, String, Time
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Item(Base):
    __tablename__ = "items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    description: Mapped[str | None] = mapped_column(String(500), nullable=True)
    price: Mapped[float] = mapped_column(Float, nullable=False)


class Servicio(Base):
    __tablename__ = "servicios"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    descripcion: Mapped[str | None] = mapped_column(String(500), nullable=True)
    categoria: Mapped[str] = mapped_column(String(100), nullable=False, default="")
    duracion_min: Mapped[int] = mapped_column(Integer, nullable=False)
    precio: Mapped[float] = mapped_column(Float, nullable=False)
    estilista_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    estilista_nombre: Mapped[str | None] = mapped_column(String(150), nullable=True)
    activo: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    citas: Mapped[list["Cita"]] = relationship(back_populates="servicio")


class Cliente(Base):
    __tablename__ = "clientes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    nombre: Mapped[str] = mapped_column(String(150), nullable=False, index=True)
    telefono: Mapped[str] = mapped_column(String(30), nullable=False)
    email: Mapped[str | None] = mapped_column(String(254), nullable=True, index=True)
    favoritos: Mapped[str | None] = mapped_column(String(500), nullable=True)
    citas: Mapped[list["Cita"]] = relationship(back_populates="cliente")


class Cita(Base):
    __tablename__ = "citas"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    cliente_id: Mapped[int] = mapped_column(ForeignKey("clientes.id"), nullable=False)
    servicio_id: Mapped[int] = mapped_column(ForeignKey("servicios.id"), nullable=False)
    estilista_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    agenda_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    estilista_nombre: Mapped[str | None] = mapped_column(String(150), nullable=True)
    fecha: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    hora: Mapped[time] = mapped_column(Time, nullable=False)
    estado: Mapped[str] = mapped_column(String(30), nullable=False, default="Pendiente")
    observaciones: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    precio: Mapped[float | None] = mapped_column(Float, nullable=True)

    cliente: Mapped[Cliente] = relationship(back_populates="citas")
    servicio: Mapped[Servicio] = relationship(back_populates="citas")

    @property
    def cliente_nombre(self) -> str:
        return self.cliente.nombre

    @property
    def servicio_nombre(self) -> str:
        return self.servicio.nombre
