# app/services/investment_projection.py
def project_monthly_return(current_value: float, annual_return: float | None):
    if not annual_return or not current_value:
        return 0.0
    return round((current_value * annual_return) / 12, 2)
