/**
 * Vital Atelier design reminder: grounded editorial wellness expressed through
 * an asymmetrical tool layout, oat-paper warmth, Verdant Green actions, and
 * readable human-first data. Avoid generic centered dashboard composition.
 */
import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  CircleHelp,
  Footprints,
  Gauge,
  HeartPulse,
  Info,
  RotateCcw,
  Ruler,
  Scale,
  Sparkle,
  Weight,
} from "lucide-react";

type Unit = "metric" | "imperial";

type Result = {
  bmi: number;
  category: "Underweight" | "Healthy range" | "Overweight" | "Obesity";
  note: string;
  healthyRange: string;
  marker: number;
};

const categoryStyles = {
  Underweight: { color: "#6A9BB5", label: "Below the usual range", icon: ArrowDown },
  "Healthy range": { color: "#4E8A63", label: "Within the usual range", icon: HeartPulse },
  Overweight: { color: "#D39A43", label: "Above the usual range", icon: ArrowUp },
  Obesity: { color: "#C76B59", label: "Well above the usual range", icon: ArrowUp },
};

function getResult(unit: Unit, values: Record<string, string>): Result | null {
  let bmi: number;
  let heightMetres: number;

  if (unit === "metric") {
    const heightCm = Number(values.heightCm);
    const weightKg = Number(values.weightKg);
    if (!heightCm || !weightKg || heightCm < 80 || heightCm > 250 || weightKg < 20 || weightKg > 500) {
      return null;
    }
    heightMetres = heightCm / 100;
    bmi = weightKg / heightMetres ** 2;
  } else {
    const feet = Number(values.feet);
    const inches = Number(values.inches || 0);
    const pounds = Number(values.pounds);
    const totalInches = feet * 12 + inches;
    if (!feet || feet < 3 || feet > 8 || inches < 0 || inches > 11 || !pounds || pounds < 45 || pounds > 1100) {
      return null;
    }
    heightMetres = totalInches * 0.0254;
    bmi = (pounds / totalInches ** 2) * 703;
  }

  const roundedBmi = Number(bmi.toFixed(1));
  const healthyLowKg = 18.5 * heightMetres ** 2;
  const healthyHighKg = 24.9 * heightMetres ** 2;
  const healthyRange =
    unit === "metric"
      ? `${healthyLowKg.toFixed(1)}–${healthyHighKg.toFixed(1)} kg`
      : `${(healthyLowKg * 2.20462).toFixed(0)}–${(healthyHighKg * 2.20462).toFixed(0)} lb`;

  let category: Result["category"];
  let note: string;

  if (roundedBmi < 18.5) {
    category = "Underweight";
    note = "Your result falls below the standard adult BMI range.";
  } else if (roundedBmi < 25) {
    category = "Healthy range";
    note = "Your result falls within the standard adult BMI range.";
  } else if (roundedBmi < 30) {
    category = "Overweight";
    note = "Your result falls above the standard adult BMI range.";
  } else {
    category = "Obesity";
    note = "Your result falls well above the standard adult BMI range.";
  }

  return {
    bmi: roundedBmi,
    category,
    note,
    healthyRange,
    marker: Math.min(96, Math.max(4, ((roundedBmi - 14) / 24) * 100)),
  };
}

export default function Home() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [values, setValues] = useState<Record<string, string>>({
    heightCm: "",
    weightKg: "",
    feet: "",
    inches: "",
    pounds: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const activeResult = useMemo(() => (submitted ? result : null), [submitted, result]);
  const resultStyle = activeResult ? categoryStyles[activeResult.category] : null;
  const ResultIcon = resultStyle?.icon ?? Gauge;

  const updateValue = (field: string, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    if (submitted) {
      setSubmitted(false);
      setResult(null);
    }
  };

  const switchUnit = (nextUnit: Unit) => {
    if (nextUnit === unit) return;
    setUnit(nextUnit);
    setValues({ heightCm: "", weightKg: "", feet: "", inches: "", pounds: "" });
    setSubmitted(false);
    setResult(null);
  };

  const calculate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setResult(getResult(unit, values));
  };

  const reset = () => {
    setValues({ heightCm: "", weightKg: "", feet: "", inches: "", pounds: "" });
    setSubmitted(false);
    setResult(null);
  };

  const hasError = submitted && !result;

  return (
    <main className="vital-app">
      <div className="ambient-shape ambient-shape-one" aria-hidden="true" />
      <div className="ambient-shape ambient-shape-two" aria-hidden="true" />

      <section className="intro-rail" aria-label="About BMI">
        <header className="brand-lockup">
          <img src="/manus-storage/vital-atelier-logo_398229d3.png" alt="Vital Measure" className="brand-mark" />
          <span>VITAL <em>measure</em></span>
        </header>

        <div className="intro-copy">
          <p className="eyebrow"><span /> Body composition tool</p>
          <h1>Find your number.<br />Keep the context.</h1>
          <p className="intro-summary">
            Calculate your body mass index using your height and weight, then see how it sits within the standard adult range.
          </p>
        </div>

        <div className="still-life-frame" aria-hidden="true">
          <img src="/manus-storage/vital-atelier-wellness-still-life_733a3cd9.jpg" alt="" />
          <span className="photo-label">A small measure<br />of everyday wellbeing</span>
        </div>

        <div className="rail-footnote">
          <Info size={15} strokeWidth={1.8} />
          <p>BMI is a screening measure, not a medical diagnosis. It is intended for adults aged 20 and over.</p>
        </div>
      </section>

      <section className="calculator-spread" aria-label="BMI calculator">
        <div className="topline">
          <p className="edition-label">Personal health field notes <span>01 / 01</span></p>
          <div className="sun-mark" aria-hidden="true"><i /><i /><i /><i /></div>
        </div>

        <div className="calculator-header">
          <div>
            <p className="eyebrow"><span /> Your calculation</p>
            <h2>Body mass index</h2>
          </div>
          <button className="quiet-reset" type="button" onClick={reset} aria-label="Reset calculator">
            <RotateCcw size={15} /> Reset
          </button>
        </div>

        <div className="calculator-grid">
          <div className="form-panel">
            <div className="unit-selector" aria-label="Choose measurement system">
              <button className={unit === "metric" ? "unit-button selected" : "unit-button"} type="button" onClick={() => switchUnit("metric")}>
                Metric <small>cm / kg</small>
              </button>
              <button className={unit === "imperial" ? "unit-button selected" : "unit-button"} type="button" onClick={() => switchUnit("imperial")}>
                Imperial <small>ft / in / lb</small>
              </button>
            </div>

            <form onSubmit={calculate} noValidate>
              {unit === "metric" ? (
                <div className="field-stack">
                  <label className="measure-field">
                    <span className="field-icon"><Ruler size={18} /></span>
                    <span className="field-copy"><b>Height</b><small>How tall are you?</small></span>
                    <input inputMode="decimal" type="number" min="80" max="250" step="0.1" placeholder="170" value={values.heightCm} onChange={(event) => updateValue("heightCm", event.target.value)} aria-label="Height in centimetres" />
                    <em>cm</em>
                  </label>
                  <label className="measure-field">
                    <span className="field-icon"><Weight size={18} /></span>
                    <span className="field-copy"><b>Weight</b><small>Your current weight</small></span>
                    <input inputMode="decimal" type="number" min="20" max="500" step="0.1" placeholder="65" value={values.weightKg} onChange={(event) => updateValue("weightKg", event.target.value)} aria-label="Weight in kilograms" />
                    <em>kg</em>
                  </label>
                </div>
              ) : (
                <div className="field-stack imperial-fields">
                  <div className="height-composite">
                    <div className="composite-intro"><span className="field-icon"><Ruler size={18} /></span><span><b>Height</b><small>How tall are you?</small></span></div>
                    <label><input inputMode="numeric" type="number" min="3" max="8" placeholder="5" value={values.feet} onChange={(event) => updateValue("feet", event.target.value)} aria-label="Height in feet" /><em>ft</em></label>
                    <label><input inputMode="numeric" type="number" min="0" max="11" placeholder="7" value={values.inches} onChange={(event) => updateValue("inches", event.target.value)} aria-label="Height in inches" /><em>in</em></label>
                  </div>
                  <label className="measure-field">
                    <span className="field-icon"><Weight size={18} /></span>
                    <span className="field-copy"><b>Weight</b><small>Your current weight</small></span>
                    <input inputMode="decimal" type="number" min="45" max="1100" step="0.1" placeholder="143" value={values.pounds} onChange={(event) => updateValue("pounds", event.target.value)} aria-label="Weight in pounds" />
                    <em>lb</em>
                  </label>
                </div>
              )}

              {hasError && <p className="input-error" role="alert">Enter a realistic height and weight to calculate your BMI.</p>}
              <button className="calculate-button" type="submit"><Sparkle size={18} /> Calculate my BMI <span>↗</span></button>
            </form>
          </div>

          <aside className={activeResult ? "result-panel is-result" : "result-panel"} aria-live="polite">
            {activeResult && resultStyle ? (
              <div className="result-reveal">
                <div className="result-overline"><ResultIcon size={16} color={resultStyle.color} /> {resultStyle.label}</div>
                <div className="result-number"><span>{activeResult.bmi}</span><small>BMI</small></div>
                <h3 style={{ color: resultStyle.color }}>{activeResult.category}</h3>
                <p className="result-note">{activeResult.note}</p>
                <div className="healthy-weight"><span>Usual weight range for your height</span><strong>{activeResult.healthyRange}</strong></div>
              </div>
            ) : (
              <div className="result-empty">
                <span className="empty-gauge"><Gauge size={31} strokeWidth={1.4} /></span>
                <p className="eyebrow"><span /> Your result</p>
                <h3>Ready when you are.</h3>
                <p>Enter your height and weight to see your BMI and the usual range for your height.</p>
              </div>
            )}
          </aside>
        </div>

        <section className="range-section" aria-label="Standard BMI categories">
          <div className="range-heading">
            <div><p className="eyebrow"><span /> Reading the scale</p><h3>The adult BMI range</h3></div>
            <p>For most adults, a BMI from 18.5 to 24.9 is usually considered within the healthy range.</p>
          </div>
          <div className="range-ribbon-wrap">
            <div className="range-marker" style={{ left: `${activeResult?.marker ?? 10}%`, opacity: activeResult ? 1 : 0 }} aria-hidden="true"><i /><span>{activeResult?.bmi}</span></div>
            <div className="range-ribbon" aria-hidden="true"><i /><i /><i /><i /></div>
            <div className="range-labels"><span>Underweight <b>&lt;18.5</b></span><span>Healthy <b>18.5–24.9</b></span><span>Overweight <b>25–29.9</b></span><span>Obesity <b>30+</b></span></div>
          </div>
        </section>

        <footer className="calculator-footer">
          <span><Footprints size={16} /> A simple measure for a fuller picture.</span>
          <a href="https://www.cdc.gov/bmi/about/index.html" target="_blank" rel="noreferrer">About BMI <CircleHelp size={14} /></a>
        </footer>
      </section>
    </main>
  );
}
