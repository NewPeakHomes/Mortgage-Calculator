class MortgageCalc extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <link rel="stylesheet" href="https://yourdomain.com/mortgage-calculator/calculator.css">

      <div class="calculator">
        <h2>Mortgage Calculator</h2>

        <label>ZIP Code:</label>
        <input type="text" id="zip" placeholder="e.g., 83422" maxlength="5" />

        <label>Home Price: $<span id="priceVal">400,000</span></label>
        <input type="range" min="50000" max="1000000" step="10000" value="400000" id="price">

        <label>Down Payment: $<span id="downVal">80,000</span></label>
        <input type="range" min="0" max="1000000" step="10000" value="80000" id="down">

        <label>Loan Term: <span id="termVal">30</span> years</label>
        <input type="range" min="10" max="40" step="5" value="30" id="term">

        <label>Interest Rate (%):</label>
        <input type="number" id="rate" value="6.5" step="0.01" min="0">

        <label>Property Tax Rate (%):</label>
        <input type="number" id="tax" value="1.2" step="0.01" min="0">

        <label>Home Insurance (monthly $):</label>
        <input type="number" id="insurance" value="100" step="1" min="0">

        <div class="output">
          <h3>Estimated Monthly Payment</h3>
          <p id="monthly">$0.00</p>
        </div>
      </div>
    `;

    this.calcElements = {
      price: this.querySelector('#price'),
      down: this.querySelector('#down'),
      term: this.querySelector('#term'),
      rate: this.querySelector('#rate'),
      tax: this.querySelector('#tax'),
      insurance: this.querySelector('#insurance'),
      monthly: this.querySelector('#monthly'),
      priceVal: this.querySelector('#priceVal'),
      downVal: this.querySelector('#downVal'),
      termVal: this.querySelector('#termVal')
    };

    Object.values(this.calcElements).forEach(el => {
      if (el.tagName === 'INPUT') {
        el.addEventListener('input', () => this.calculate());
      }
    });

    this.calculate();
  }

  calculate() {
    const price = parseFloat(this.calcElements.price.value);
    const down = parseFloat(this.calcElements.down.value);
    const loan = price - down;
    const rate = parseFloat(this.calcElements.rate.value) / 100 / 12;
    const n = parseInt(this.calcElements.term.value) * 12;

    const propertyTaxRate = parseFloat(this.calcElements.tax.value) / 100;
    const insurance = parseFloat(this.calcElements.insurance.value);

    const monthlyTax = (price * propertyTaxRate) / 12;

    const monthlyPrincipal = rate === 0 ? loan / n : (loan * rate) / (1 - Math.pow(1 + rate, -n));

    const totalMonthly = monthlyPrincipal + monthlyTax + insurance;

    this.calcElements.monthly.textContent = `$${totalMonthly.toFixed(2).toLocaleString()}`;
    this.calcElements.priceVal.textContent = price.toLocaleString();
    this.calcElements.downVal.textContent = down.toLocaleString();
    this.calcElements.termVal.textContent = this.calcElements.term.value;
  }
}

customElements.define('mortgage-calc', MortgageCalc);
