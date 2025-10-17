from fastapi import FastAPI
from .routers import kpi

app = FastAPI(title="SWL KPI API", version="0.1.0")

@app.get("/")
def root():
    return {"status": "ok", "service": "swl-kpi-api"}

app.include_router(kpi.router, prefix="/kpi", tags=["kpi"])
