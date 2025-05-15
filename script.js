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
  const termYears = parse
