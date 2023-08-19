let displayValue = "";

function appendToDisplay(value) {
    displayValue += value;
    document.getElementById("result").value = displayValue;
}

function calculate() {
    try {
        const result = evaluateExpression(displayValue);
        displayValue = result.toString();
        document.getElementById("result").value = displayValue;
    } catch (error) {
        displayValue = ""; // Clear the displayValue if there's an error
        document.getElementById("result").value = "Error";
    }
}

function clearDisplay() {
    displayValue = "";
    document.getElementById("result").value = displayValue;
}

function evaluateExpression(expression) {
    // Split the expression into numbers and operators
    const numbers = expression.match(/[+\-*/]?([0-9.]+)/g) || [];

    // Perform the calculations using a loop
    let result = parseFloat(numbers[0]);
    for (let i = 1; i < numbers.length; i++) {
        const operator = numbers[i][0];
        const num = parseFloat(numbers[i].substring(1));
        switch (operator) {
            case "+":
                result += num;
                break;
            case "-":
                result -= num;
                break;
            case "*":
                result *= num;
                break;
            case "/":
                if (num !== 0) {
                    result /= num;
                } else {
                    throw new Error("Division by zero is not allowed.");
                }
                break;
            default:
                break;
        }
    }

    return result;
}

// Import GSAP 
// Define animation timeline
const tl = gsap.timeline({ defaults: { duration: 0.3, ease: "power2.inOut" } });

// Function to animate button click
function animateButtonClick(button) {
  tl.fromTo(button, { scale: 1 }, { scale: 1.1 });
  tl.to(button, { scale: 1 });
}

// Function to animate clear button
function animateClearButton(button) {
  gsap.fromTo(
    button,
    { scale: 1 },
    { scale: 1.2, duration: 0.1, repeat: 1, yoyo: true }
  );
}

// Function to update the display
function updateDisplay(value) {
  const resultDisplay = document.getElementById("result");
  gsap.to(resultDisplay, { duration: 0.1, opacity: 0, onComplete: () => {
    resultDisplay.textContent = value;
    gsap.to(resultDisplay, { duration: 0.1, opacity: 1 });
  } });
}

// Add event listeners to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    animateButtonClick(button);
    const buttonValue = button.textContent; // Get the text content of the button
    if (!isNaN(buttonValue) || buttonValue === "." || buttonValue === "+"
        || buttonValue === "-" || buttonValue === "*" || buttonValue === "/") {
      // Only update the display for numeric and operator buttons
      document.getElementById("result").value += buttonValue;
    } else if (buttonValue === "=") {
      // Handle the calculation logic when "=" is clicked
      try {
        const currentDisplayValue = document.getElementById("result").value;
        const result = eval(currentDisplayValue); // Use eval for simple calculations (consider a safer method for a production calculator)
        updateDisplay(result);
      } catch (error) {
        updateDisplay("Error"); // Handle errors gracefully
      }
    } else if (buttonValue === "C") {
      // Clear button logic
      document.getElementById("result").value = "";
    }
  });
});


// Add event listener to the clear button
document.querySelector(".clear").addEventListener("click", () => {
  animateClearButton(document.querySelector(".clear"));
  // Clear button logic
  document.getElementById("result").value = "";
});

