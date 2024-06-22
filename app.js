const calculatorEl = document.querySelector("#calculator");
const resultEl = document.querySelector(".result");
const clearAllEl = document.querySelector("#clearAll");
const deleteACharEl = document.querySelector("#deleteAChar");

let firstNumber = "";
let selectedOperator = "";
let afterNumber = "";
let isWaitingANewValue = false;

runEventListener();

function runEventListener() {
  calculatorEl.addEventListener("click", write);
  clearAllEl.addEventListener("click", clearAll);
  deleteACharEl.addEventListener("click", deleteAChar);
}

function deleteAChar() {
  if (isWaitingANewValue) {
    afterNumber = Calculator.deleteLastCharacter(afterNumber);
  } else {
    firstNumber = Calculator.deleteLastCharacter(firstNumber);
  }
  resultEl.innerHTML = Calculator.deleteLastCharacter(resultEl.innerHTML);
}

function clearAll() {
  firstNumber = "";
  selectedOperator = "";
  afterNumber = "";
  isWaitingANewValue = false;
  clearResultPanel();
}

function write(e) {
  const element = e.target;

  if (element.classList.contains("number")) {
    if (isWaitingANewValue) {
      afterNumber += element.innerText;
    } else {
      firstNumber += element.innerText;
    }

    updateResultPanel(element.innerText);
  } else if (element.classList.contains("operator")) {
    if (!Calculator.isHaveOperator(resultEl.innerHTML)) {
      selectedOperator = element.innerText;
      isWaitingANewValue = true;
      updateResultPanel(element.innerText);
    }
  } else if (element.classList.contains("equals")) {
    if (firstNumber && selectedOperator && afterNumber) {
      let result = calculate(
        firstNumber,
        selectedOperator,
        afterNumber
      ).toString();
      firstNumber = result;

      isWaitingANewValue = false;
      clearOperatorAndAfterNumber();
      clearResultPanel();
      updateResultPanel(result);
    }
  }
}

function calculate(firstNumber, operator, secondNumber) {
  let result;
  let isDotHave =
    Calculator.isDotHave(firstNumber) || Calculator.isDotHave(secondNumber);
  switch (operator) {
    case "+":
      result = isDotHave
        ? parseFloat(firstNumber) + parseFloat(secondNumber)
        : parseInt(firstNumber) + parseInt(secondNumber);
      break;

    case "-":
      result = isDotHave
        ? parseFloat(firstNumber) - parseFloat(secondNumber)
        : parseInt(firstNumber) - parseInt(secondNumber);
      break;

    case "*":
      result = isDotHave
        ? parseFloat(firstNumber) * parseFloat(secondNumber)
        : parseInt(firstNumber) * parseInt(secondNumber);
      break;

    case "/":
      result = isDotHave
        ? parseFloat(firstNumber) / parseFloat(secondNumber)
        : parseInt(firstNumber) / parseInt(secondNumber);
      break;
  }

  return result;
}

function updateResultPanel(value) {
  if (value.length >= 6) {
    value = parseFloat(value).toFixed(2);
  }
  resultEl.innerHTML += value;
}

function clearResultPanel() {
  resultEl.innerHTML = "";
}

function clearOperatorAndAfterNumber() {
  selectedOperator = "";
  afterNumber = "";
}
