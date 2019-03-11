const inquirer = require('inquirer');
const { renderGraphs } = require('./lib/cliGraphs/graphs');
const {
  taxRateBrackets,
  formatter,
} = require('./constants');

const {
  queryTaxBracket,
  validateInput,
  getPercetangeValue,
} = require('./lib/helpers');

const {
  calculateFutureValue,
  calculateRealRateOfReturn,
  calculateTfsaRoi,
  calculateRrspRoi,
  calculateRrspWithdrawl,
  calculateTaxPaidOnWithdrawl,
} = require('./lib/calculator');

const collectInputs = () => {
  const prompts = [
    {
      type: 'input',
      name: 'initialAmount',
      message: 'First Question: \n \n What is your initial deposit amount?:',
      validate: validateInput,
    },
    {
      type: 'list',
      name: 'taxRatePercentage',
      message: 'Second Question: \n \n  What is your income bracket? \n \n This is your tax bracket based on your income',
      choices: queryTaxBracket(taxRateBrackets),
      filter: getPercetangeValue,
    },
    {
      type: 'input',
      name: 'returnOnInvestment',
      message: 'Third Question: \n \n What is your return on investment rate? (default: 5%): \n \n Rate at which the invested money grows anually',
      default: 5,
      validate: validateInput,
    },
    {
      type: 'input',
      name: 'investmentPeriod',
      message: 'Fourth Question: \n \n How long will this be invested? (years):',
      validate: validateInput,
    },
    {
      type: 'input',
      name: 'taxRateInRetirement',
      message: 'Fifth Question: \n \n What is your tax rate in retirement?:  \n \n This referrs to the average income tax that you pay in retirement.',
      validate: validateInput,
    },
    {
      type: 'input',
      name: 'inflationRate',
      message: 'Final Question: \n \n At what inflation rate? (default: 3%):  \n \n This is used to find out the real rate of return ',
      default: 3,
      validate: validateInput,
    },
  ];
  return inquirer.prompt(prompts);
};

const main = async () => {
  const inputs = await collectInputs();
  const futureValue = calculateFutureValue({ ...inputs });
  const futureRoi = calculateRealRateOfReturn({ ...inputs });
  const tfsaRoi = calculateTfsaRoi({ ...inputs, futureValue, futureRoi });
  const rrspRoi = calculateRrspRoi({ ...inputs, futureRoi });
  const rrspTaxedAmount = calculateTaxPaidOnWithdrawl({ ...inputs, rrspRoi });
  const rrspAfterTax = calculateRrspWithdrawl({ ...inputs, rrspRoi });

  renderGraphs({
    initialInvestement: formatter.format(inputs.initialAmount),
    futureValue: formatter.format(futureValue),
    tfsaFinalRoi: formatter.format(tfsaRoi[tfsaRoi.length - 1]),
    rrspFinalRoi: formatter.format(rrspRoi[rrspRoi.length - 1]),
    rrspAfterTax: formatter.format(rrspAfterTax),
    taxRateInRetirement: inputs.taxRateInRetirement,
    rrspTaxedAmount: formatter.format(rrspTaxedAmount),
    numberOfYears: inputs.investmentPeriod,
    tfsaRoi,
    rrspRoi,
  });
};

main();
