# Task 1: Brent Oil Price Analysis Workflow and Foundation


**Project:** Birhan Energies – Global Energy Market Intelligence  

---

## 1. Planned Analysis Workflow

The objective of this analysis is to identify and quantify the impact of geopolitical and economic events on Brent oil prices using statistical methods. The following workflow outlines the end-to-end process:

- **Data Acquisition and Preprocessing:**  
  Load daily Brent oil price data (1987–2022) and convert date fields to a standardized datetime format.

- **Exploratory Data Analysis (EDA):**  
  Conduct trend analysis, stationarity testing (ADF test), and volatility clustering visualization using log returns.

- **Bayesian Change Point Modeling:**  
  Implement a model in PyMC to define a switch point ($\tau$) and capture structural breaks in price means ($\mu_1, \mu_2$).

- **Inference and Quantification:**  
  Execute MCMC sampling to generate posterior distributions for the change points and quantify the percentage shift in price following key events.

- **Validation:**  
  Compare detected change points with a researched dataset of 14 major geopolitical and economic events.

- **Deployment:**  
  Develop a Flask API to serve the results to a React-based interactive dashboard for stakeholder exploration.

---

## 2. Assumptions and Limitations

To ensure the integrity of the analysis, the following factors are documented:

- **Correlation vs. Causation:**  
  This analysis identifies statistical structural breaks that align temporally with external events. While we formulate hypotheses about triggers, a statistical change point indicates correlation in time and does not independently provide absolute proof of causal impact.

- **Data Accuracy:**  
  We assume the historical Brent price dataset accurately represents global market valuations for the periods recorded.

- **Model Constraints:**  
  The core model assumes a discrete switch in parameters; real-world market reactions may sometimes be more gradual or influenced by multiple overlapping factors.

---

## 3. Communication Channels

The findings will be communicated to investors, policymakers, and energy companies through the following formats:

- **Interactive React Dashboard:**  
  Featuring date range selectors and *event highlights* to visualize price spikes and drops.

- **Technical PDF / Blog Report:**  
  Detailed documentation of methodology, Bayesian posterior distributions, and quantified impact statements.

- **Flask API Endpoints:**  
  Structured data access for technical teams to integrate findings into external operational planning tools.

---

## 4. Initial EDA Findings

Prior to modeling, the time series properties of the Brent oil data were analyzed:

- **Trend Analysis:**  
  Visual investigation of the price series confirms a non-linear trend characterized by significant shocks, specifically the 2008 financial crisis and the 2020 global pandemic.

- **Stationarity Testing:**  
  An Augmented Dickey-Fuller (ADF) test resulted in a p-value of 0.289. Since $p > 0.05$, the data is confirmed to be non-stationary, justifying the use of a Change Point model to identify structural breaks.

- **Volatility Patterns:**  
  Log returns analysis demonstrates *volatility clustering*, indicating that high-risk periods are grouped together during major market shocks.

---

## 5. Model Understanding and Expected Outputs

- **Purpose of Change Point Models:**  
  These models are used to identify structural breaks—moments when the underlying statistical properties of a time series change significantly.

- **Expected Outputs:**
  - **Switch Point ($\tau$):** The most probable date of the structural change.
  - **Parameter Values:** New mean price values or variance levels before and after the detected break.
  - **Uncertainty Quantification:** Probabilistic distributions indicating the certainty of the model regarding the change point date.

---

## 6. Key Event Dataset 

A structured dataset containing 14 major geopolitical and economic events (1990–2022) was compiled to correlate with model-detected change points.

