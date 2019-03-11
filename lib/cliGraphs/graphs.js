const blessed = require('blessed');
const contrib = require('blessed-contrib');
const { tableConfig, lineGraphConfig } = require('../../constants');

const tableData = dataSet => (
  {
    headers: ['', 'TFSA', 'RRSP'],
    data:
    [
      ['Initial Investement Amount:', `${dataSet.initialInvestement}`, `${dataSet.initialInvestement}`],
      ['Future value:', `${dataSet.tfsaFinalRoi}`, `${dataSet.rrspFinalRoi}`],
      ['Tax Paid Upon Withdrawl:', 0, `${dataSet.rrspTaxedAmount}`],
      ['After tax future value:', `${dataSet.tfsaFinalRoi}`, `${dataSet.rrspAfterTax}`],
    ],
  }
);

const lineData = dataSet => (
  [
    {
      title: 'Rrsp Roi',
      x: Array.apply(null, { length: dataSet.numberOfYears }).map(Number.call, String),
      y: dataSet.rrspRoi.map(item => parseInt(item, 10)),
      style: {
        line: 'red',
      },
    },
    {
      title: 'Tfsa Roi',
      y: dataSet.tfsaRoi.map(item => parseInt(item, 10)),
      style: {
        line: 'yellow',
      },
    },
  ]
);

const renderGraphs = (dataSet) => {
  const screen = blessed.screen();
  const grid = new contrib.grid({ rows: 12, cols: 12, screen });

  const table = grid.set(6, 6, 5, 5, contrib.table, tableConfig);
  const line = grid.set(0, 0, 9, 8, contrib.line, lineGraphConfig);


  table.focus();
  screen.append(table, line);

  line.setData(lineData(dataSet));
  table.setData(tableData(dataSet));

  screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
  screen.render();
};


module.exports = { renderGraphs };
