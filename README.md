# Vital Measure BMI Calculator

A responsive BMI calculator built with **plain HTML, CSS, and JavaScript**. It requires no framework, package manager, build step, server, or external calculation service.

## Use

Open `index.html` in any modern browser. The calculator runs directly from the three source files at the repository root. Switching between **Metric** and **Imperial** converts entered height and weight values, then clears the previous BMI result for recalculation in the active system. The language selector remembers the selected language in the browser.

## Features

| Feature | Description |
|---|---|
| Metric and imperial input | Calculates BMI from centimetres/kilograms or feet/inches/pounds. Switching units converts entered height and weight values instead of clearing them. |
| BMI context | Shows the BMI value, category, usual height-adjusted weight range, and range-ribbon position. |
| Local history | Keeps the eight newest calculations in the browser’s `localStorage`; no history is sent anywhere. |
| Result-card download | Creates a PNG card from the current calculation using the browser’s Canvas API. |
| Dark mode | Includes a persisted light/dark preference using `localStorage`. |
| Localization | Provides natural, user-facing English, Spanish, French, and Bangla language options. Each locale covers interface labels, input help, validation feedback, BMI categories, results, history, localized dates, accessible labels, and PNG result cards. |
| Bangla typography | Uses Noto Sans Bengali for Bengali interface text so Bangla remains readable in the header, calculator, results, history, and exported card. |
| Responsive layout | Adapts the editorial two-column view for small screens. |

## Files

```text
.
├── index.html  # Page markup and accessible controls
├── style.css   # Visual design, responsive layout, and dark mode
└── app.js      # BMI logic, local history, PNG export, and interactions
```

## Languages

The calculator ships with **English**, **Español**, **Français**, and **বাংলা**. Changing the language updates the visible interface and dynamic content immediately, while keeping calculations and saved BMI records on the device. The selected language is stored locally in the browser, along with the selected color theme and calculation history.

> The category names and supporting descriptions are written for everyday use. They explain the adult BMI screening bands but do not provide a medical diagnosis.

## Calculation

Metric BMI uses `kg / m²`. Imperial BMI uses `703 × lb / in²`. The app presents the standard adult screening bands, with 18.5–24.9 shown as the usual healthy range. BMI is a screening measure, not a medical diagnosis. [1]

## Privacy

All calculations, history entries, and theme preferences remain in the browser. Clearing browser site data removes the saved history and theme preference.

## Reference

[1] [Centers for Disease Control and Prevention — About BMI](https://www.cdc.gov/bmi/about/index.html)
