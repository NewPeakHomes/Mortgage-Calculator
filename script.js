function syncInput(sliderId, inputId, displayId, isCurrency = true, suffix = '') {
  const slider = document.getElementById(sliderId);
  const input = document.getElementById(inputId);
  const display = document.getElementById(displayId);

  function format(val) {
    return isCurrency ? parseFloat(val).toLocaleString() + suffix : val + suffix;
  }

  function updateFromSlider() {
    input.value = slider.value;
    display.textContent = format(slider.value);
  }

  function updateFromInput() {
    slider.value = input.value;
    display.textContent = format(input.value);
  }

  slider.addEventListener("input", updateFromSlider);
  input.addEventListener("input", updateFromInput);

  updateFromSlider();
}

syncInput("homePrice", "homePriceInput", "homePriceValue");
syncInput("downPayment", "downPaymentInput", "downPaymentValue");
syncInput("interestRate", "interestRateInput", "interestRateValue", false, '%');
syncInput("propertyTax", "propertyTaxInput", "propertyTaxValue");
syncInput("insurance", "insuranceInput", "insuranceValue");
syncInput("loanTerm", "loanTermInput", "loanTermValue", false, ' years');

function calculateMortgage() {
  const price = parseFloat(document.getElementById("homePriceInput").value) || 0;
  const down = parseFloat(document.getElementById("downPaymentInput").value) || 0;
  const rate = parseFloat(document.getElementById("interestRateInput").value) || 0;
  const termYears = parseInt(document.getElementById("loanTermInput").value) || 0;
  const tax = parseFloat(document.getElementById("propertyTaxInput").value) || 0;
  const insurance = parseFloat(document.getElementById("insuranceInput").value) || 0;

  const loan = price - down;
  const monthlyRate = rate / 100 / 12;
  const payments = termYears * 12;

  const monthlyPrincipal = rate > 0
    ? loan * monthlyRate / (1 - Math.pow(1 + monthlyRate, -payments))
    : loan / payments;

  const monthlyTax = tax / 12;
  const monthlyInsurance = insurance / 12;

  const totalMonthly = monthlyPrincipal + monthlyTax + monthlyInsurance;

  document.getElementById("result").textContent =
    `Estimated Monthly Payment: $${totalMonthly.toFixed(2).toLocaleString()}`;
}
