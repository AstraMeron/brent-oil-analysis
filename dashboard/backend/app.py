from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Absolute path setup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "..", "..", "data", "raw", "BrentOilPrices.csv")

@app.route("/api/historical", methods=["GET"])
def get_historical():
    try:
        df = pd.read_csv(DATA_PATH)
        # Clean and prepare data
        df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
        df = df.dropna(subset=["Date", "Price"])
        df = df.sort_values("Date")

        # Format date for JSON response
        df["Date"] = df["Date"].dt.strftime("%Y-%m-%d")

        # Downsample (approx weekly) for performance
        df_sampled = df.iloc[::7]
        return jsonify(df_sampled.to_dict(orient="records"))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/analysis", methods=["GET"])
def get_analysis():
    # Sending your specific Task 2 results
    return jsonify({
        "change_point": "2005-02-02",
        "pre_mean": 21.36,
        "post_mean": 75.48
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)