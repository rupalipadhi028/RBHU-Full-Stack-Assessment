from io import BytesIO
from pathlib import Path
import sys
import os
sys.path.insert(0, str(Path(__file__).resolve().parent / 'vendor'))
import pandas as pd
import plotly.express as px
from flask import Flask, jsonify, request

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024
REQUIRED_COLUMNS = {"salesperson", "revenue", "region"}
ALLOWED_FRONTEND_ORIGINS = {
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    os.environ.get("FRONTEND_ORIGIN", ""),
} - {""}

@app.after_request
def allow_frontend(response):
    origin = request.headers.get("Origin")
    if origin in ALLOWED_FRONTEND_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Vary"] = "Origin"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return response

@app.get("/health")
def health():
    return jsonify(status="ok", service="sales-analytics")

@app.post("/analyze")
def analyze():
    uploaded = request.files.get("file")
    if uploaded is None or not uploaded.filename.lower().endswith(".csv"):
        return jsonify(error="Upload a CSV file using the 'file' field."), 400
    try:
        data = pd.read_csv(BytesIO(uploaded.read()))
        missing = REQUIRED_COLUMNS - set(data.columns.str.strip().str.lower())
        if missing:
            return jsonify(error="CSV is missing required columns: " + ", ".join(sorted(missing))), 400
        data.columns = data.columns.str.strip().str.lower()
        data["revenue"] = pd.to_numeric(data["revenue"], errors="coerce")
        data = data.dropna(subset=["salesperson", "region", "revenue"])
        if data.empty:
            return jsonify(error="CSV has no usable sales rows."), 400

        by_region = data.groupby("region", as_index=False)["revenue"].sum().sort_values("revenue", ascending=False)
        by_person = data.groupby("salesperson", as_index=False)["revenue"].sum().sort_values("revenue", ascending=False).head(10)
        region_figure = px.bar(by_region, x="region", y="revenue", title="Revenue by Region", labels={"region": "Region", "revenue": "Revenue"}, color="region")
        person_figure = px.bar(by_person, x="salesperson", y="revenue", title="Top Salespeople", labels={"salesperson": "Salesperson", "revenue": "Revenue"}, color="revenue")
        for figure in (region_figure, person_figure):
            figure.update_layout(template="plotly_white", margin=dict(l=24, r=20, t=52, b=30), showlegend=False)
        summary = {
            "rows": int(len(data)),
            "totalRevenue": round(float(data["revenue"].sum()), 2),
            "averageRevenue": round(float(data["revenue"].mean()), 2),
            "medianRevenue": round(float(data["revenue"].median()), 2),
            "topSalesperson": str(by_person.iloc[0]["salesperson"]),
            "regionTotals": {str(row["region"]): round(float(row["revenue"]), 2) for _, row in by_region.iterrows()},
        }
        return jsonify(summary=summary, charts={
            "region": region_figure.to_html(
                full_html=False,
                include_plotlyjs="cdn",
                config={"toImageButtonOptions": {"format": "png", "filename": "revenue-by-region", "width": 1200, "height": 700, "scale": 2}},
            ),
            "salespeople": person_figure.to_html(
                full_html=False,
                include_plotlyjs="cdn",
                config={"toImageButtonOptions": {"format": "png", "filename": "top-salespeople", "width": 1200, "height": 700, "scale": 2}},
            ),
        })
    except Exception as error:
        app.logger.exception("CSV analysis failed")
        return jsonify(error="Could not analyze this CSV. Check the file format and required columns."), 400

@app.errorhandler(413)
def too_large(_error):
    return jsonify(error="CSV must be smaller than 10 MB."), 413

if __name__ == "__main__":
    app.run(host=os.environ.get("HOST", "127.0.0.1"), port=int(os.environ.get("PORT", "5000")), debug=False)

