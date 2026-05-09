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
  



calculateEMI();





