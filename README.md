# Vital Measure — BMI Calculator

Vital Measure is a responsive **body mass index (BMI) calculator** designed as a calm, editorial wellness tool. It runs entirely in the browser with **HTML, CSS, and vanilla JavaScript**. No React, TypeScript, backend service, database, or calculation API is used.

> **Purpose:** Give adults a quick BMI estimate together with clear, non-diagnostic context and a height-adjusted usual weight range.

## Features

| Area | Included behavior |
|---|---|
| Measurement systems | Metric inputs in centimetres and kilograms, plus imperial inputs in feet, inches, and pounds. |
| BMI calculation | Computes BMI locally on form submission and rounds the displayed result to one decimal place. |
| Result context | Classifies the result as underweight, healthy range, overweight, or obesity using standard adult BMI bands. |
| Healthy-weight range | Calculates the usual weight range corresponding to the entered height, shown in the currently selected measurement system. |
| Visual feedback | Moves a result marker across a four-part BMI range ribbon and adjusts the result category colour. |
| Input protection | Rejects incomplete and implausible height or weight values, with a clear corrective message. |
| Usability | Supports keyboard form submission, visible focus states, a reset action, responsive stacking, and reduced-motion preferences. |
| Visual system | Uses a warm paper texture, custom Vital Measure logo, generated editorial imagery, and an asymmetrical wellness-journal layout. |

## Calculation Method

The app calculates BMI using the selected measurement system. For metric values, it divides weight in kilograms by height in metres squared. For imperial values, it divides weight in pounds by height in inches squared and multiplies by 703.

| System | Formula |
|---|---|
| Metric | `BMI = kg / m²` |
| Imperial | `BMI = 703 × lb / in²` |

The usual weight range is derived by rearranging the metric BMI calculation around the adult BMI range of **18.5–24.9**: `weight = BMI target × height²`. Results are expressed in kilograms for metric users and converted to pounds for imperial users. BMI is a screening measure rather than a medical diagnosis, and the tool includes that limitation in the interface. [1]

## BMI Categories

| BMI | Result label in the app |
|---|---|
| Below 18.5 | Underweight |
| 18.5–24.9 | Healthy range |
| 25.0–29.9 | Overweight |
| 30.0 and above | Obesity |

These category boundaries are intended for adult BMI screening and should not replace personalised clinical advice. [1]

## Technology

The application is deliberately small and framework-free.

| Layer | Implementation |
|---|---|
| Markup | `client/index.html` |
| Styling | `client/style.css` |
| Interactions and calculations | `client/app.js` |
| Local development and builds | Vite |
| External assets | Project-managed image URLs for the logo, paper texture, and editorial still life |

## Project Structure

```text
.
├── client/
│   ├── app.js          # Unit selection, validation, BMI calculations, and result rendering
│   ├── index.html      # Semantic page structure and accessible form controls
│   └── style.css       # Responsive Vital Measure design system
├── ideas.md            # Documented visual direction and brand decisions
├── package.json        # Minimal Vite scripts and dependencies
├── todo.md             # Implementation checklist
└── vite.config.mjs     # JavaScript-only Vite configuration
```

## Run Locally

The project requires a current Node.js release and `pnpm`.

```bash
pnpm install
pnpm dev
```

Vite will print a local development URL. To create an optimized static build, run:

```bash
pnpm build
```

To syntax-check the browser JavaScript before building, run:

```bash
pnpm check
```

## User Flow

The calculator defaults to metric units. A visitor enters height and weight, selects **Calculate my BMI**, and receives a BMI score, category, short explanatory note, usual weight range, and a marker on the BMI scale. Switching units clears the displayed result to prevent mixed-unit interpretation. **Reset** clears the active fields and restores the initial result state.

## Accessibility and Responsive Behavior

The form uses native numeric inputs, labels, an `aria-live` result area, keyboard-operable unit buttons, and a status message for invalid data. The two-column editorial spread collapses into a single-column reading flow on mobile screens. Nonessential transitions are minimized for visitors who enable reduced-motion preferences.

## Important Health Note

BMI is a useful population-level and initial screening measure, but it does not directly measure body fat or account for every health-related factor. Users should seek professional advice for personalised interpretation, especially where health conditions, pregnancy, athletic body composition, or other clinical considerations apply. [1]

## References

[1] [Centers for Disease Control and Prevention, *About Body Mass Index (BMI)*](https://www.cdc.gov/bmi/about/index.html)
