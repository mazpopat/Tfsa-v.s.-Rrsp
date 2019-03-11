const calculateFutureValue = ({ taxRatePercentage, initialAmount }) => {
  const percentage = (parseFloat(taxRatePercentage) / 100);
  return (parseInt(initialAmount) - (parseInt(initialAmount) * percentage)).toFixed(2);
};


const calculateRealRateOfReturn = ({ returnOnInvestment, inflationRate }) => {
  const roi = parseFloat(returnOnInvestment) / 100;
  const inflation = parseFloat(inflationRate) / 100;
  return 1 + (((1 + roi) / (1 + inflation)) - 1);
};


const calculateTfsaRoi = ({ futureValue, futureRoi, investmentPeriod }) => {
  const yearlyTfsaRoi = [];

  for (let investmentYear = 1; investmentYear <= investmentPeriod; investmentYear += 1) {
    const roi = (futureValue * (Math.pow(futureRoi, investmentYear))).toFixed(2);
    yearlyTfsaRoi.push(roi);
  }
  return yearlyTfsaRoi;
};

const calculateRrspRoi = ({ initialAmount, futureRoi, investmentPeriod }) => {
  const yearlyRrspRoi = [];

  for (let investmentYear = 1; investmentYear <= investmentPeriod; investmentYear += 1) {
    const rrspRoi = (initialAmount * (Math.pow(futureRoi, investmentYear))).toFixed(2);
    yearlyRrspRoi.push(rrspRoi);
  }
  return yearlyRrspRoi;
};


const calculateTaxPaidOnWithdrawl = ({ rrspRoi, taxRateInRetirement }) => {
  const finalRrspValue = rrspRoi[rrspRoi.length - 1];

  return (parseFloat(finalRrspValue) * (taxRateInRetirement / 100));
};

const calculateRrspWithdrawl = ({ rrspRoi, taxRateInRetirement }) => {
  const finalRrspValue = rrspRoi[rrspRoi.length - 1];

  return ((finalRrspValue - (finalRrspValue * (taxRateInRetirement / 100)))).toFixed(2);
};


module.exports = {
  calculateFutureValue,
  calculateRealRateOfReturn,
  calculateTfsaRoi,
  calculateRrspRoi,
  calculateRrspWithdrawl,
  calculateTaxPaidOnWithdrawl,
};
