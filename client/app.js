/* Vital Atelier behavior: retain a calm, direct calculation flow—inputs,
   result context, unit choices, and reset actions remain fully client-side. */

const elements = {
  form: document.querySelector("#bmi-form"),
  unitButtons: document.querySelectorAll(".unit-button"),
  metricFields: document.querySelector("#metric-fields"),
  imperialFields: document.querySelector("#imperial-fields"),
  error: document.querySelector("#input-error"),
  reset: document.querySelector("#reset-button"),
  resultPanel: document.querySelector("#result-panel"),
  resultEmpty: document.querySelector("#result-empty"),
  resultContent: document.querySelector("#result-content"),
  resultSymbol: document.querySelector("#result-symbol"),
  resultLabel: document.querySelector("#result-label"),
  bmiValue: document.querySelector("#bmi-value"),
  resultCategory: document.querySelector("#result-category"),
  resultNote: document.querySelector("#result-note"),
  healthyRange: document.querySelector("#healthy-range"),
  marker: document.querySelector("#range-marker"),
  markerValue: document.querySelector("#marker-value"),
  heightCm: document.querySelector("#height-cm"),
  weightKg: document.querySelector("#weight-kg"),
  feet: document.querySelector("#height-feet"),
  inches: document.querySelector("#height-inches"),
  pounds: document.querySelector("#weight-pounds"),
};

let activeUnit = "metric";

const categoryDetails = {
  underweight: { name: "Underweight", label: "Below the usual range", note: "Your result falls below the standard adult BMI range.", color: "#6A9BB5", symbol: "↓" },
  healthy: { name: "Healthy range", label: "Within the usual range", note: "Your result falls within the standard adult BMI range.", color: "#4E8A63", symbol: "●" },
  overweight: { name: "Overweight", label: "Above the usual range", note: "Your result falls above the standard adult BMI range.", color: "#D39A43", symbol: "↑" },
  obesity: { name: "Obesity", label: "Well above the usual range", note: "Your result falls well above the standard adult BMI range.", color: "#C76B59", symbol: "↑" },
};

function numberFrom(input) {
  return Number(input.value);
}

function getMeasurement() {
  if (activeUnit === "metric") {
    const heightCm = numberFrom(elements.heightCm);
    const weightKg = numberFrom(elements.weightKg);
    if (!heightCm || !weightKg || heightCm < 80 || heightCm > 250 || weightKg < 20 || weightKg > 500) return null;
    const heightMetres = heightCm / 100;
    return { bmi: weightKg / (heightMetres ** 2), heightMetres };
  }

  const feet = numberFrom(elements.feet);
  const inches = Number(elements.inches.value || 0);
  const pounds = numberFrom(elements.pounds);
  const totalInches = feet * 12 + inches;
  if (!feet || feet < 3 || feet > 8 || inches < 0 || inches > 11 || !pounds || pounds < 45 || pounds > 1100) return null;
  return { bmi: (pounds / (totalInches ** 2)) * 703, heightMetres: totalInches * 0.0254 };
}

function getCategory(bmi) {
  if (bmi < 18.5) return categoryDetails.underweight;
  if (bmi < 25) return categoryDetails.healthy;
  if (bmi < 30) return categoryDetails.overweight;
  return categoryDetails.obesity;
}

function clearResult() {
  elements.error.classList.add("is-hidden");
  elements.resultPanel.classList.remove("is-result");
  elements.resultContent.classList.add("is-hidden");
  elements.resultEmpty.classList.remove("is-hidden");
  elements.marker.classList.remove("is-visible");
}

function selectUnit(nextUnit) {
  activeUnit = nextUnit;
  elements.unitButtons.forEach((button) => {
    const selected = button.dataset.unit === nextUnit;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  elements.metricFields.classList.toggle("is-hidden", nextUnit !== "metric");
  elements.imperialFields.classList.toggle("is-hidden", nextUnit !== "imperial");
  clearResult();
}

function showResult(measurement) {
  const bmi = Number(measurement.bmi.toFixed(1));
  const category = getCategory(bmi);
  const lowKg = 18.5 * (measurement.heightMetres ** 2);
  const highKg = 24.9 * (measurement.heightMetres ** 2);
  const healthyRange = activeUnit === "metric"
    ? `${lowKg.toFixed(1)}–${highKg.toFixed(1)} kg`
    : `${(lowKg * 2.20462).toFixed(0)}–${(highKg * 2.20462).toFixed(0)} lb`;
  const markerPosition = Math.min(96, Math.max(4, ((bmi - 14) / 24) * 100));

  elements.error.classList.add("is-hidden");
  elements.resultSymbol.textContent = category.symbol;
  elements.resultSymbol.style.color = category.color;
  elements.resultLabel.textContent = category.label;
  elements.bmiValue.textContent = bmi.toFixed(1);
  elements.resultCategory.textContent = category.name;
  elements.resultCategory.style.color = category.color;
  elements.resultNote.textContent = category.note;
  elements.healthyRange.textContent = healthyRange;
  elements.markerValue.textContent = bmi.toFixed(1);
  elements.marker.style.left = `${markerPosition}%`;
  elements.resultEmpty.classList.add("is-hidden");
  elements.resultContent.classList.remove("is-hidden");
  elements.resultPanel.classList.remove("is-result");
  void elements.resultPanel.offsetWidth;
  elements.resultPanel.classList.add("is-result");
  elements.marker.classList.add("is-visible");
}

elements.unitButtons.forEach((button) => button.addEventListener("click", () => selectUnit(button.dataset.unit)));

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const measurement = getMeasurement();
  if (!measurement) {
    elements.error.classList.remove("is-hidden");
    clearResult();
    elements.error.classList.remove("is-hidden");
    return;
  }
  showResult(measurement);
});

elements.reset.addEventListener("click", () => {
  elements.form.reset();
  clearResult();
});

document.querySelectorAll("input").forEach((input) => input.addEventListener("input", clearResult));
