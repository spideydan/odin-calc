let a = [];
let operator = "";
let isEqual = false;
let content = "";
let decimalPressed = false;

const buttons = document.querySelectorAll("button");
const equal = document.querySelector(".equal");
const cancel = document.querySelector("#cancel");
const backspace = document.querySelector("#backspace");
const display = document.querySelector(".display");
const decimal = document.querySelector("#decimal");

const add = (num1, num2) => {
  return num1 + num2;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const operate = (operator, a, b) => {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  }
};

const displayValue = function () {
  //If a button with className "digit" is pressed
  if (this.className === "digit") {
    //Clear screen if an equality sign is pressed before
    if (isEqual) {
      display.textContent = "";
      isEqual = false;
    }
    //Lock decimal button once pressed
    if (this.textContent === ".") {
      decimal.setAttribute("style", "pointer-events: none");
      decimalPressed = true;
    }
    display.textContent += this.textContent;
  }

  //If a button with className "operator" is pressed
  if (this.className === "operator") {
    decimalPressed = false;
    a.push(Number(display.textContent));

    //If divided by 0
    if (a[1] === 0 && operator === "/") {
      display.textContent = "";
      display.textContent = "undefined";
      a = [];
      isEqual = true;
    } else {
      //Calculate previous pair of numbers with operator
      if (a.length > 1) {
        result = operate(operator, a[0], a[1]);
        display.textContent = result;
        a = [];
        a.push(result);
        isEqual = true;
        operator = this.textContent;
      } else {
        isEqual = false;
        display.textContent = "";
        operator = this.textContent;
      }
    }
  }

  //If a button with className "equal" is pressed
  if (this.className == "equal") {
    decimalPressed = false;
    a.push(Number(display.textContent));

    if (a[1] === 0 && operator === "/") {
      display.textContent = "";
      display.textContent = "undefined";
    } else if (a[1] === 0) {
      display.textContent = a[1];
    } else {
      result = operate(operator, a[0], a[1]);
      display.textContent = `${result}`;
    }
    a = [];
    isEqual = true;
  }

  //If the cancel button is pressed
  if (this.textContent === "C") {
    decimalPressed = false;
    display.textContent = "";
    a = [];
  }

  //If the backspace button is pressed
  if (this.textContent === "Back") {
    content = display.textContent;
    content = content.substring(0, content.length - 1);
    display.textContent = content;
  }

  //If the percent sign is pressed
  if (this.textContent === "%") {
    content = display.textContent;
    display.textContent = content / 100;
  }

  //If the negative sign is pressed
  if (this.textContent === "+/-") {
    // Turn into positive number if pressed
    if (display.textContent[0] === "-") {
      content = Math.abs(display.textContent);
      display.textContent = Math.abs(content);
      // Turn into negative number if pressed
    } else {
      content = display.textContent;
      display.textContent = "-" + content;
    }
  }

  //Unlock decimal button
  if (decimalPressed === false) {
    decimal.removeAttribute("style");
  }
};

//Keyboard support for calculator
document.addEventListener("keydown", (event) => {
  buttons.forEach((button) => {
    if (
      event.key === button.textContent.toLowerCase() ||
      event.key === button.textContent.toUpperCase()
    ) {
      console.log(button);
      button.click();
      button.setAttribute(
        "style",
        "background-color: rgb(58, 58, 58); color: white"
      );
    }
  });
  if (event.key === "Enter") {
    equal.click();
    equal.setAttribute(
      "style",
      "background-color: rgb(58, 58, 58); color: white"
    );
  }
  if (event.key === "Backspace") {
    backspace.click();
    backspace.setAttribute(
      "style",
      "background-color: rgb(58, 58, 58); color: white"
    );
  }
  if (event.key === "Escape") {
    cancel.click();
    cancel.setAttribute(
      "style",
      "background-color: rgb(58, 58, 58); color: white"
    );
  }
});

document.addEventListener("keyup", (event) => {
  buttons.forEach((button) => {
    if (
      event.key === button.textContent.toUpperCase() ||
      event.key === button.textContent.toLowerCase()
    ) {
      button.removeAttribute(
        "style",
        "background-color: rgb(58, 58, 58); color: white"
      );
    }
  });
  if (event.key === "Enter") {
    equal.removeAttribute(
      "style",
      "background-color: rgb(58, 58, 58); color: white"
    );
  }
  if (event.key === "Backspace") {
    backspace.removeAttribute(
      "style",
      "background-color: rgb(58, 58, 58); color: white"
    );
  }
  if (event.key === "Escape") {
    cancel.removeAttribute(
      "style",
      "background-color: rgb(58, 58, 58); color: white"
    );
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", displayValue);
});
