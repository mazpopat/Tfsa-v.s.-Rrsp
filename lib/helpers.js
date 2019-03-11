

const validateInput = input => (
  !isNaN(parseFloat(input)) && isFinite(input)
);


const queryTaxBracket = taxRateBrackets => (
  taxRateBrackets.map(bracket => `${bracket.amountLow} to ${bracket.amountHigh}. Tax Rate: ${bracket.percentage}%`)
);

const getPercetangeValue = val => (val.split(': ').pop());

module.exports = {
  validateInput,
  queryTaxBracket,
  getPercetangeValue,
};
