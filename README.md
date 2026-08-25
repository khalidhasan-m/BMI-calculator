# Vital Measure BMI Calculator

A responsive BMI calculator built with **plain HTML, CSS, and JavaScript**. It requires no framework, package manager, build step, server, or external calculation service.

## Use

Open `index.html` in any modern browser. The calculator runs directly from the three source files at the repository root. Switching between **Metric** and **Imperial** converts entered height and weight values, then clears the previous BMI result for recalculation in the active system.

## Features

| Feature | Description |
|---|---|
| Metric and imperial input | Calculates BMI from centimetres/kilograms or feet/inches/pounds. Switching units converts entered height and weight values instead of clearing them. |
| BMI context | Shows the BMI value, category, usual height-adjusted weight range, and range-ribbon position. |
| Local history | Keeps the eight newest calculations in the browser’s `localStorage`; no history is sent anywhere. |
| Result-card download | Creates a PNG card from the current calculation using the browser’s Canvas API. |
| Dark mode | Includes a persisted light/dark preference using `localStorage`. |
| Responsive layout | Adapts the editorial two-column view for small screens. |

## Files

```text
.
├── index.html  # Page markup and accessible controls
├── style.css   # Visual design, responsive layout, and dark mode
└── app.js      # BMI logic, local history, PNG export, and interactions
```

## Calculation

Metric BMI uses `kg / m²`. Imperial BMI uses `703 × lb / in²`. The app presents the standard adult screening bands, with 18.5–24.9 shown as the usual healthy range. BMI is a screening measure, not a medical diagnosis. [1]

## Privacy

All calculations, history entries, and theme preferences remain in the browser. Clearing browser site data removes the saved history and theme preference.

## Reference

[1] [Centers for Disease Control and Prevention — About BMI](https://www.cdc.gov/bmi/about/index.html)
