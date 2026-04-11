import pandas as pd
import numpy as np
import sys
import json
import io
import argparse
from scipy import stats

# Force stats/stdout to utf-8 to prevent windows unicode errors
sys.stdout.reconfigure(encoding='utf-8')

def calculate_entropy(series):
    counts = series.value_counts()
    probs = counts / len(series)
    return stats.entropy(probs)

def analyze_dataset(file_path):
    try:
        # Load Data with automatic delimiter detection
        if file_path.endswith('.csv'):
            try:
                # Try to detect delimiter automatically (common for semicolon datasets like UCI)
                df = pd.read_csv(file_path, sep=None, engine='python', on_bad_lines='skip')
                # If it still only found 1 column, many CSVs use ';' but sep=None sometimes misses it on small windows files
                if df.shape[1] == 1:
                    df = pd.read_csv(file_path, sep=';')
            except Exception:
                df = pd.read_csv(file_path)
        elif file_path.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(file_path)
        else:
            return {"error": f"Unsupported file format: {file_path}"}

        # Basic Stats
        row_count, col_count = df.shape
        numerical_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        categorical_cols = df.select_dtypes(exclude=[np.number]).columns.tolist()

        # Data Quality Audit
        missing_data = df.isnull().sum()
        missing_percentage = (missing_data / row_count) * 100
        duplicates = df.duplicated().sum()
        
        # Enhanced Quality Score
        quality_score = 100 - (missing_percentage.mean() + (duplicates / row_count * 100))
        quality_score = max(0, min(100, quality_score))

        data_quality = {
            "score": round(quality_score, 1),
            "details": f"Missingness: {missing_data.sum()} total ({missing_percentage.mean():.1f}%), Duplicates: {duplicates} rows.",
            "missing": missing_data.to_dict()
        }

        visualizations = []
        statistical_insights = []

        # 1. ENHANCED UNIVARIATE ANALYSIS (Numerical)
        for col in numerical_cols[:8]: # Analyze more columns
            data = df[col].dropna()
            if len(data) == 0: continue
            
            desc = data.describe()
            skew = data.skew()
            kurt = data.kurtosis()
            cv = (desc['std'] / desc['mean'] * 100) if desc['mean'] != 0 else 0
            
            # Histogram
            num_bins = 10 if data.nunique() < 20 else 15
            hist, bin_edges = np.histogram(data, bins=num_bins)
            
            # Smart labels for bins
            is_int = np.array_equal(data, data.astype(int))
            hist_data = []
            for i in range(len(hist)):
                if is_int:
                    label = f"{int(bin_edges[i])}" if num_bins < 12 else f"{int(bin_edges[i])}-{int(bin_edges[i+1])}"
                else:
                    label = f"{bin_edges[i]:.1f}"
                hist_data.append({"name": label, "value": int(hist[i])})
            
            skew_desc = "low"
            if not np.isnan(skew):
                skew_desc = 'high' if abs(skew) > 1 else 'moderate' if abs(skew) > 0.5 else 'low'

            visualizations.append({
                "id": f"hist_{col}",
                "type": "bar",
                "title": f"Distribution of {col}",
                "description": f"This histogram shows the spread of '{col}'. The average is {desc['mean']:.1f}. A '{skew_desc}' skew means most data points are concentrated on one side of the scale.",
                "layout": "half",
                "data": hist_data,
                "themeColor": "indigo"
            })
            
            statistical_insights.append({
                "title": f"Summary for {col}",
                "text": f"On average, {col} is {desc['mean']:.1f}. Most values fall between {desc['25%']:.1f} and {desc['75%']:.1f}."
            })

            # Box Plot summary
            visualizations.append({
                "id": f"box_{col}",
                "type": "bar",
                "title": f"Statistics Summary: {col}", 
                "description": f"This chart breaks down {col} into critical ranges. The middle 50% of your data sits between {desc['25%']:.1f} (Q1) and {desc['75%']:.1f} (Q3).",
                "layout": "half",
                "data": [
                    {"name": "Min (Lowest)", "value": desc['min']},
                    {"name": "Q1 (25th %)", "value": desc['25%']},
                    {"name": "Median (Middle)", "value": desc['50%']},
                    {"name": "Q3 (75th %)", "value": desc['75%']},
                    {"name": "Max (Highest)", "value": desc['max']}
                ],
                "themeColor": "purple"
            })

        # 2. ENHANCED CATEGORICAL ANALYSIS
        for col in categorical_cols[:5]:
            counts = df[col].value_counts().head(10) # Limit to top 10 for clarity
            entropy = calculate_entropy(df[col].dropna())
            bar_data = [{"name": str(k), "value": int(v)} for k, v in counts.items()]
            
            # Simple date detection
            is_date = 'date' in col.lower() or 'time' in col.lower() or 'year' in col.lower()
            v_type = "pie" if len(counts) <= 6 else "bar"
            
            visualizations.append({
                "id": f"cat_{col}",
                "type": v_type,
                "title": f"Groups by {col}",
                "description": f"This chart organizes your data into categories based on '{col}'. " + 
                              (f"As this represents time/date, it show the most active periods. " if is_date else "") + 
                              f"The group '{counts.index[0]}' is significantly active with {int(counts.iloc[0])} records.",
                "layout": "half",
                "data": bar_data,
                "themeColor": "teal"
            })
            statistical_insights.append({
                "title": f"Categorical: {col}",
                "text": f"Found {df[col].nunique()} unique types in {col}. '{counts.index[0]}' is the dominant group."
            })

        # 3. ENHANCED BIVARIATE ANALYSIS
        market_trends_details = []
        if len(numerical_cols) > 1:
            corr_matrix = df[numerical_cols].corr()
            corr_pairs = corr_matrix.unstack().sort_values(ascending=False)
            corr_pairs = corr_pairs[corr_pairs < 0.999] # No self
            
            seen = set()
            top_pairs = []
            for (c1, c2), val in corr_pairs.items():
                if len(top_pairs) >= 4: break
                if (c1, c2) not in seen and (c2, c1) not in seen:
                    top_pairs.append(((c1, c2), val))
                    seen.add((c1, c2))
            
            for (col1, col2), val in top_pairs:
                if abs(val) < 0.2: continue
                
                sample_size = min(200, len(df))
                samples = df[[col1, col2]].dropna().sample(sample_size)
                scatter_data = [{"x": float(row[col1]), "y": float(row[col2]), "name": f"Item {i}"} for i, (_, row) in enumerate(samples.iterrows())]
                
                rel_type = "Strong" if abs(val) > 0.7 else "Moderate" if abs(val) > 0.4 else "Weak"
                direction = "direct" if val > 0 else "opposite"
                
                visualizations.append({
                    "id": f"scatter_{col1}_{col2}",
                    "type": "scatter",
                    "title": f"Link: {col1} vs {col2}",
                    "description": f"This scatter plot shows a {rel_type.lower()} {direction} connection. As {col1} changes, {col2} tends to move in the {direction} direction.",
                    "layout": "full",
                    "data": scatter_data,
                    "themeColor": "emerald"
                })
                market_trends_details.append({
                    "title": f"Potential Link Found",
                    "text": f"A {rel_type.lower()} relationship suggests {col1} and {col2} are linked. (Score: {val:.2f})"
                })

        # 4. ANOMALY DETECTION
        anomalies = []
        for col in numerical_cols[:5]:
            z_scores = np.abs(stats.zscore(df[col].dropna()))
            outliers = np.where(z_scores > 3)[0]
            if len(outliers) > 0:
                anomalies.append({
                    "title": f"Outliers in {col}",
                    "text": f"Found {len(outliers)} unusual records that are significantly different from the average in {col}."
                })
            
            q1, q3 = df[col].quantile([0.25, 0.75])
            iqr = q3 - q1
            iqr_outliers = df[(df[col] < (q1 - 1.5 * iqr)) | (df[col] > (q3 + 1.5 * iqr))]
            if len(iqr_outliers) > 0:
                anomalies.append({
                    "title": f"Data Fencing: {col}",
                    "text": f"IQR analysis detected {len(iqr_outliers)} points that fall outside the typical range for {col}."
                })

        # Construct Final JSON
        summary_text = f"Analyzed {row_count} records across {col_count} attributes. "
        summary_text += f"The dataset is {data_quality['score']}% healthy with {len(numerical_cols)} numerical and {len(categorical_cols)} categorical columns. "
        summary_text += f"Key patterns were identified in {', '.join(numerical_cols[:2])} and {', '.join(categorical_cols[:2])}."

        output = {
            "dashboard_title": f"Data Analysis: {col_count} Attributes & {row_count} Records",
            "executive_summary": summary_text,
            "dataset_overview": {
                "rows": row_count,
                "columns": col_count,
                "numerical_columns": len(numerical_cols),
                "categorical_columns": len(categorical_cols),
                "density": 1 - (missing_data.sum() / (row_count * col_count))
            },
            "data_quality_audit": data_quality,
            "statistical_insights": statistical_insights,
            "market_trends": {
                "overview": f"Multi-variable analysis across {len(numerical_cols)} dimensions and {len(categorical_cols)} segments.",
                "details": market_trends_details
            },
            "anomalies": anomalies,
            "visualizations": visualizations,
            "key_features": numerical_cols[:3] + categorical_cols[:2],
            "kpis": [
                {"label": "Total Records", "value": f"{row_count:,}", "change": "Rows", "trend": "neutral", "icon": "activity"},
                {"label": "Data Integrtiy", "value": f"{quality_score:.1f}%", "change": "Health Score", "trend": "up" if quality_score > 90 else "neutral", "icon": "trending-up"},
                {"label": "Total Attributes", "value": str(col_count), "change": f"{len(numerical_cols)} numbers, {len(categorical_cols)} categories", "trend": "neutral", "icon": "layers"}
            ]
        }
        
        return output

    except Exception as e:
        return {"error": str(e)}

    except Exception as e:
        return {"error": str(e)}

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            # Check for NaN/Inf in numpy floats
            if np.isnan(obj) or np.isinf(obj):
                return None
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        if isinstance(obj, np.bool_):
            return bool(obj)
        return super(NpEncoder, self).default(obj)

def clean_nan(obj):
    """
    Recursively replace NaN and Infinity with None (null) for standard types,
    since standard JSON encoders might miss python float NaNs if not using allow_nan=False
    and allow_nan=True produces invalid JSON.
    """
    if isinstance(obj, float):
        if np.isnan(obj) or np.isinf(obj):
            return None
        return obj
    elif isinstance(obj, dict):
        return {k: clean_nan(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [clean_nan(v) for v in obj]
    return obj

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Perform EDA on a dataset')
    parser.add_argument('file_path', type=str, help='Path to the dataset file (CSV/Excel)')
    args = parser.parse_args()
    
    result = analyze_dataset(args.file_path)
    
    # Clean result of any standard python float NaNs/Infs that NpEncoder might miss or if allow_nan=True is default
    cleaned_result = clean_nan(result)
    
    # Use allow_nan=False to ensure we strictly produce valid JSON, relying on NpEncoder/clean_nan to fix issues
    try:
        print(json.dumps(cleaned_result, cls=NpEncoder, allow_nan=False))
    except ValueError:
        # Fallback: if there are still NaNs, force them to null via string constraint or re-cleaning
        # But allow_nan=False wraps them in error.
        # Let's try with allow_nan=True but we know Node.js hates it. 
        # Actually our clean_nan should handle it.
        # Let's just print.
        print(json.dumps(cleaned_result, cls=NpEncoder))
