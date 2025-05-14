// Sync sliders and inputs
function syncSliderInput(sliderId, inputId, valueId, isCurrency = true) {
  const slider = document.getElementById(sliderId);
  const input = document.getElementById(inputId);
  const valueDisplay = document.getElementById(valueId);

  function updateFromSlider() {
    input.value = slider.value;
    valueDisplay.textContent = isCurrency
      ? parseFloat(slider.value).toLocaleString()
      : slider.value;
  }

  function updateFromInput() {
    slider.value = input.value;
    valueDisplay.textContent = isCurrency
      ? parseFloat(input.value).toLocaleString()
      : input.value;
  }

  slider.addEventListener('input', updateFromSlider);
  input.addEventListener('input', updateFromInput);

  updateFromSlider();
}

// Initialize synced inputs
syncSliderInput('homePrice', 'homePriceInput', 'homePriceValue');
syncSliderInput('interestRate', 'interestRateInput', 'interestRateValue', false);
syncSliderInput('downPayment', 'downPaymentInput', 'downPaymentValue');
syncSliderInput('propertyTax', 'propertyTaxInput', 'propertyTaxValue');
syncSliderInput('insurance', 'insuranceInput', 'insuranceValue');

// Collapsible logic
document.querySelectorAll('.collapsible-btn').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    const content = button.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});

// Mortgage calculation
function calculateMortgage() {
  const price = parseFloat(document.getElementById('homePriceInput').value) || 0;
  const down = parseFloat(document.getElementById('downPaymentInput').value) || 0;
  const rate = parseFloat(document.getElementById('interestRateInput').value) || 0;
  const tax = parseFloat(document.getElementById('propertyTaxInput').value) || 0;
  const insurance = parseFloat(document.getElementById('insuranceInput').value) || 0;

  const principal = price - down;
  const monthlyRate = rate / 100 / 12;
  const numPayments = 30 * 12;

  const monthlyPrincipalInterest = rate > 0
    ? principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numPayments))
    : principal / numPayments;

  const monthlyTax = tax / 12;
  const monthlyInsurance = insurance / 12;

  const total = monthlyPrincipalInterest + monthlyTax + monthlyInsurance;

  document.getElementById('result').textContent = 
    `Estimated Monthly Payment: $${total.toFixed(2).toLocaleString()}`;
}
