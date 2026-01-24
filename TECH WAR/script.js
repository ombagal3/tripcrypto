const amount = document.getElementById("amount");
const rate = document.getElementById("rate");
const years = document.getElementById("years");



const amountVal = document.getElementById("amountVal");
const rateVal = document.getElementById("rateVal");
const yearsVal = document.getElementById("yearsVal");



const emiText = document.getElementById("emi");
const principalText = document.getElementById("principal");
const interestText = document.getElementById("interest");
const totalAmount = document.getElementById("totalAmount");
const donut = document.getElementById("donut");




function calculateEMI() {

  let P = +amount.value;
  let R = +rate.value / 12 / 100;
  let N = +years.value * 12;

  let emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  emi = Math.round(emi);

  let totalPay = emi * N;
  let interest = totalPay - P;

  emiText.innerText = emi;
  principalText.innerText = P;
  interestText.innerText = Math.round(interest);
  totalAmount.innerText = "₹" + Math.round(totalPay);

  let principalPercent = (P / totalPay) * 100;
  let interestPercent = 100 - principalPercent;

  donut.style.background = `conic-gradient(
    orange 0% ${principalPercent}%,
    #6fa8dc ${principalPercent}% 100%
  )`;

}

[amount, rate, years].forEach(el => el.addEventListener("input", () => {
  amountVal.value = amount.value;
  rateVal.value = rate.value;
  yearsVal.value = years.value;
  calculateEMI();
}));



calculateEMI();
