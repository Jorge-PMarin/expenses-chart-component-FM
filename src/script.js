const expenseLabels = document.querySelectorAll('.expenses__item__label');
const expenseBars = document.querySelectorAll('.expenses__item__bar');

function calculate(data) {
  //get amounts
  const amounts = data.map((item) => item.amount);

  //get highest amount
  const highest = Math.max(...amounts);

  //calculate bar size in relation to the highest amount(100%)
  const barSizes = amounts.map(amount => Math.round((amount * 100) / highest));
  console.log(barSizes);

  //set bar size for each bar
  for (let i = 0; i < amounts.length; i++) {
    expenseBars[i].style.height = barSizes[i].toString() + '%'
  }

  //set amount for each label
  for (let i = 0; i < expenseLabels.length; i++) {
    expenseLabels[i].textContent = amounts[i].toString()
    expenseLabels[i].style.bottom = (barSizes[i]).toString() + '%'
  }

}

fetch('../data.json')
  .then((res) => res.json())
  .then((data) => {
    jsonData = data;
    calculate(data);
  });
