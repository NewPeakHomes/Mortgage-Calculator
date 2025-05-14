document.getElementById('calculate-btn').addEventListener('click', function() {
  const loanAmount = parseFloat(document.getElementById('loan-amount').value);
  const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
  const loanTerm = parseFloat(document.getElementById('loan-term').value) * 12;

  // Formula to calculate monthly payment
  const monthlyPayment = (loanAmount * interestRate) / (1 - Math.pow(1 + interestRate, -loanTerm));
  const totalPayment = monthlyPayment * loanTerm;
  const totalInterest = totalPayment - loanAmount;

  // Display results
  document.getElementById('monthly-payment').textContent = monthlyPayment.toFixed(2);
  document.getElementById('total-interest').textContent = totalInterest.toFixed(2);
  document.getElementById('total-payment').textContent = totalPayment.toFixed(2);
});
