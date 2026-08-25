# Vital Measure BMI Calculator

Vital Measure is a responsive **browser-only BMI calculator** built with plain HTML, CSS, and JavaScript. It has no framework, package manager, build step, backend, database, or external calculation service. Open `index.html` in a modern browser to use it.

> BMI is an adult screening measure rather than a medical diagnosis. The calculator presents commonly used adult BMI categories and is intended for people aged 20 and over. [1]

## What the App Does

| Area | Current behavior |
|---|---|
| Measurement systems | Calculates BMI with metric inputs in centimetres and kilograms, or imperial inputs in feet, inches, and pounds. Switching systems converts populated values and clears the previous result so it can be recalculated in the active unit system. |
| BMI result | Shows the calculated BMI, the matching adult category, a category explanation, the usual weight range for the entered height, and a marker on the four-band BMI ribbon. |
| Input validation | Rejects missing, non-numeric, and implausible values with translated field-specific feedback. Metric limits are 80–250 cm and 20–500 kg. Imperial limits are 3–8 ft, 0–11 in, and 45–1,100 lb. |
| Personal history | Stores the eight newest calculations in the browser using `localStorage`. Saved records display BMI, category, entered measurements, and a localized date. |
| Result-card download | Creates a visual PNG result card from the latest calculation with the browser Canvas API. The card follows the selected language and color theme. |
| Appearance | Offers a persisted light/dark mode preference and a responsive editorial layout for desktop and small screens. |
| Localization | Supports English, Español, Français, and বাংলা. The active language applies to static labels, accessible names, validation, BMI categories, results, history, dates, and PNG result cards. |
| Brand treatment | Uses a CSS-rendered Vital Measure wordmark, including an editorial “V” seal and text lockup. The header logo and favicon do not depend on an external logo image. |

## Use the Calculator

Enter height and weight in the currently selected system, then choose **Calculate my BMI**. The result panel shows the BMI value, its adult category, the usual weight range for that height, and the BMI-ribbon position. Use **Reset** to clear the current form and result. Use the unit switcher to convert entered values between metric and imperial inputs.

The language control remembers the selected language locally. The theme control also remembers the light or dark preference locally. These preferences apply on the next page load in the same browser.

## Languages

The interface is written for everyday use in four languages: **English**, **Español**, **Français**, and **বাংলা**. Non-English interfaces use localized health-calculator phrasing rather than direct English-style wording. Bangla uses **Noto Sans Bengali** for the header, form, results, history, and downloadable result card.

| Locale | Browser language code | Date format |
|---|---:|---|
| English | `en` | English month and date style |
| Spanish | `es` | Spanish month and date style |
| French | `fr` | French month and date style |
| Bangla | `bn` | Bengali month and numeral style |

## BMI Calculation and Categories

Metric BMI uses `kg / m²`. Imperial BMI uses `703 × lb / in²`. The app places results in the following adult screening bands. [1]

| Category | BMI value |
|---|---:|
| Underweight | Below 18.5 |
| Healthy range | 18.5–24.9 |
| Overweight | 25.0–29.9 |
| Obesity | 30.0 and above |

## Privacy and Local Data

All BMI calculations, history entries, selected language, and theme preference remain in `localStorage` in the current browser. The app does not send BMI inputs or history to a server. Clearing this site’s browser data removes the saved history, language preference, and theme preference.

## Project Files

```text
.
├── index.html  # Semantic page structure and accessible controls
├── style.css   # Visual system, responsive layout, CSS wordmark, dark mode, and Bengali typography
└── app.js      # BMI formulas, validation, unit conversion, localization, local history, and PNG export
```

## Reference

[1] [Centers for Disease Control and Prevention — About BMI](https://www.cdc.gov/bmi/about/index.html)
