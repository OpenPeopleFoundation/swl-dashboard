from fastapi import APIRouter

router = APIRouter()

# Mock data — mirrors the schema the dashboard expects.
@router.get("/build")
def build_kpis():
    weeks = [
        {"wk":"W1","spend":18000,"planned":20000,"invoices":6,"paymentLag":9},
        {"wk":"W2","spend":22000,"planned":20000,"invoices":7,"paymentLag":12},
        {"wk":"W3","spend":19500,"planned":20000,"invoices":8,"paymentLag":7},
        {"wk":"W4","spend":24000,"planned":20000,"invoices":9,"paymentLag":14},
        {"wk":"W5","spend":21000,"planned":20000,"invoices":5,"paymentLag":10},
        {"wk":"W6","spend":20000,"planned":20000,"invoices":6,"paymentLag":8},
    ]
    vendors = [
        {"name":"Millwork Co","spend":42000,"lag":12},
        {"name":"HVAC Ltd","spend":36000,"lag":15},
        {"name":"Electrical","spend":28000,"lag":9},
        {"name":"Plumbing","spend":19500,"lag":11},
        {"name":"Flooring","spend":13000,"lag":7},
    ]
    alignment = [
        {"kpi":"VR","score":0.72},
        {"kpi":"DE","score":0.66},
        {"kpi":"QAA","score":0.61},
        {"kpi":"FL","score":0.58},
        {"kpi":"CRI","score":0.74},
    ]
    # Derived (example)
    cash_on_hand = 145000
    weekly_burn = round(sum(w["spend"] for w in weeks[-3:]) / 3)
    runway_weeks = max(0, round(cash_on_hand / weekly_burn))
    planned_total = sum(w["planned"] for w in weeks)
    actual_total = sum(w["spend"] for w in weeks)
    budget_var_pct = ((actual_total - planned_total) / planned_total) * 100
    contingency = 30000
    contingency_used = 11000

    return {
        "weeks": weeks,
        "vendors": vendors,
        "alignment": alignment,
        "summary": {
            "cashOnHand": cash_on_hand,
            "weeklyBurn": weekly_burn,
            "runwayWeeks": runway_weeks,
            "budgetVariancePct": budget_var_pct,
            "contingency": contingency,
            "contingencyUsed": contingency_used
        }
    }
