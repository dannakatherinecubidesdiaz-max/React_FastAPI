from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers.citas import router as citas_router
from app.routers.clientes import router as clientes_router
from app.routers.items import router as items_router
from app.routers.servicios import router as servicios_router


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="Salon Glitt API",
    description="API para gestionar artículos, servicios, citas y clientes desde React.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items_router, prefix="/api")
app.include_router(servicios_router, prefix="/api")
app.include_router(citas_router, prefix="/api")
app.include_router(clientes_router, prefix="/api")
