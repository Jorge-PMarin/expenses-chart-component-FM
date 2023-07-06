const expenseLabels = document.querySelectorAll(".expenses__item__label");
const expenseBars = document.querySelectorAll(".expenses__item__bar");

function calculate(data) {
  //get amounts
  const amounts = data.map((item) => item.amount);

  //get highest amount
  const highest = Math.max(...amounts);

  //calculate bar size in relation to the highest amount(100%)
  const barSizes = amounts.map((amount) =>
    Math.round((amount * 100) / highest)
  );

  //set bar size for each bar
  for (let i = 0; i < amounts.length; i++) {
    expenseBars[i].style.height = barSizes[i].toString() + "%";
  }

  //set amount for each label
  for (let i = 0; i < expenseLabels.length; i++) {
    expenseLabels[i].textContent = "$" + amounts[i].toString();
    expenseLabels[i].style.bottom = (barSizes[i] + 6).toString() + "%";
  }
}

function highlightCurrentDay() {
  const date = new Date();
  const today = date.getDay();
  const bar = expenseBars[today - 1];
  bar.classList.add("expenses__item__bar--today");
}

//show the amount of a specific day when hovered
function handleHover() {
  expenseBars.forEach((bar) => {
    //display amount label when hovered
    bar.addEventListener("mouseover", () => {
      const amountLabel = bar.parentElement.children[0];
      amountLabel.classList.add("expenses__item__label--active");
    });

    //hide amount label on mouseout
    bar.addEventListener("mouseout", () => {
      const amountLabel = bar.parentElement.children[0];
      amountLabel.classList.remove("expenses__item__label--active");
    });
  });
}

highlightCurrentDay();
handleHover();

fetch("../data.json")
  .then((res) => res.json())
  .then((data) => {
    jsonData = data;
    calculate(data);
  });
