document.addEventListener('DOMContentLoaded', function () {
    const homePriceSlider = document.getElementById('homePrice');
    const homePriceInput = document.getElementById('homePriceInput');
    const downPaymentSlider = document.getElementById('downPayment');
    const downPaymentInput = document.getElementById('downPaymentInput');
    const loanTermSlider = document.getElementById('loanTerm');
    const loanTermInput = document.getElementById('loanTermInput');
    const interestRateSlider = document.getElementById('interestRate');
    const interestRateInput = document.getElementById('interestRateInput');
    const propertyTaxSlider = document.getElementById('propertyTax');
    const propertyTaxInput = document.getElementById('propertyTaxInput');
    const homeInsuranceSlider = document.getElementById('homeInsurance');
    const homeInsuranceInput = document.getElementById('homeInsuranceInput');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDisplay = document.getElementById('monthlyPayment');

    function updateValues() {
        document.getElementById('homePriceValue').textContent = homePriceSlider.value;
        document.getElementById('downPaymentValue').textContent = downPaymentSlider.value;
        document.getElementById('loanTermValue').textContent = loanTermSlider.value;
        document.getElementById('interestRateValue').textContent = interestRateSlider.value;
        document.getElementById('propertyTaxValue').textContent = propertyTaxSlider.value;
        document.getElementById('homeInsuranceValue').textContent = homeInsuranceSlider.value;

        homePriceInput.value = homePriceSlider.value;
        downPaymentInput.value = downPaymentSlider.value;
        loanTermInput.value = loanTermSlider.value;
        interestRateInput.value = interestRateSlider.value;
        propertyTaxInput.value = propertyTaxSlider.value;
        homeInsuranceInput.value = homeInsuranceSlider.value;
    }

    function calculateMortgage() {
        const homePrice = parseFloat(homePriceSlider.value);
        const downPayment = parseFloat(downPaymentSlider.value);
        const loanAmount = homePrice - downPayment;
        const loanTermYears = parseFloat(loanTermSlider.value);
        const annualInterestRate = parseFloat(interestRateSlider.value) / 100;
        const monthlyInterestRate = annualInterestRate / 12;
        const numberOfPayments = loanTermYears * 12;

        const propertyTax = parseFloat(propertyTaxSlider.value) / 12;
        const homeInsurance = parseFloat(homeInsuranceSlider.value) / 12;

        const mortgagePayment = (loanAmount * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        const totalMonthlyPayment = mortgagePayment + propertyTax + homeInsurance;
        resultDisplay.textContent = `$${totalMonthlyPayment.toFixed(2)}`;
    }

    // Event Listeners
    homePriceSlider.addEventListener('input', updateValues);
    downPaymentSlider.addEventListener('input', updateValues);
    loanTermSlider.addEventListener('input', updateValues);
    interestRateSlider.addEventListener('input', updateValues);
    propertyTaxSlider.addEventListener('input', updateValues);
    homeInsuranceSlider.addEventListener('input', updateValues);

    homePriceInput.addEventListener('input', function () {
        homePriceSlider.value = homePriceInput.value;
        updateValues();
    });
    downPaymentInput.addEventListener('input', function () {
        downPaymentSlider.value = downPaymentInput.value;
        updateValues();
    });
    loanTermInput.addEventListener('input', function () {
        loanTermSlider.value = loanTermInput.value;
        updateValues();
    });
    interestRateInput.addEventListener('input', function () {
        interestRateSlider.value = interestRateInput.value;
        updateValues();
    });
    propertyTaxInput.addEventListener('input', function () {
        propertyTaxSlider.value = propertyTaxInput.value;
        updateValues();
    });
    homeInsuranceInput.addEventListener('input', function () {
        homeInsuranceSlider.value = homeInsuranceInput.value;
        updateValues();
    });

    calculateBtn.addEventListener('click', calculateMortgage);

    // Initialize values
    updateValues();
});
