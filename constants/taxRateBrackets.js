const taxRateBrackets = [
  {
    percentage: 20.06,
    amountLow: 0,
    amountHigh: 40707,
  },
  {
    percentage: 22.70,
    amountLow: 40707,
    amountHigh: 81416,
  },
  {
    percentage: 31.00,
    amountLow: 81416,
    amountHigh: 93476,
  },
  {
    percentage: 32.79,
    amountLow: 93476,
    amountHigh: 95259,
  },
  {
    percentage: 38.29,
    amountLow: 95259,
    amountHigh: 113506,
  },
  {
    percentage: 40.70,
    amountLow: 113506,
    amountHigh: 147667,
  },
  {
    percentage: 43.70,
    amountLow: 147667,
    amountHigh: 153900,
  },
  {
    percentage: 45.80,
    amountLow: 153900,
    amountHigh: 210371,
  },
  {
    percentage: 49.80,
    amountLow: 210371,
    amountHigh: null,
  },
];

module.exports = { taxRateBrackets };
