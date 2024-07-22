from contextlib import asynccontextmanager
from pathlib import Path

from starlette.middleware.cors import CORSMiddleware
from starlette.responses import FileResponse
from starlette.staticfiles import StaticFiles
from uvicorn import run
from fastapi import FastAPI, HTTPException
from shared.config_reader import base_webapp_url

from web.routers import trips, users, cars, finished, mediator


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up...")
    yield
    print("Shutting down...")


__static_files_path = Path(__file__).parent / "front" / "static"
__built_files_path = Path(__file__).parent / "front" / "OnTheWay" / "build"
app = FastAPI(lifespan=lifespan)


@app.get("/")
async def root() -> FileResponse:
    return FileResponse(__static_files_path / "index.html")


app.mount("/static", StaticFiles(directory=__static_files_path), name="static")
app.mount("/app", StaticFiles(directory=__built_files_path), name="app")


def start():
    app.include_router(trips.router)
    app.include_router(users.router)
    app.include_router(cars.router)
    app.include_router(finished.router)
    app.include_router(mediator.router)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[base_webapp_url],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    run(app)
