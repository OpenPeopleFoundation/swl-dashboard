# SWL KPI Monorepo

- `apps/dashboard`: React (Vite) dashboard for Build + Accounting KPIs
- `services/api`: FastAPI backend exposing `/kpi/build` and `/kpi/accounting`
- `packages/shared`: Shared TypeScript/Pydantic schemas
- `db`: SQL schema + seed data
- `scripts`: helper scripts

## Quick start

### API
cd services/api
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

### Dashboard
cd apps/dashboard
npm i
npm run dev
