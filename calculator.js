function add(num1, num2) {
    return num1 + num2;
}

function subs(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

const buttons = [
    'C', '7', '8', '9', '/', 
    '4', '5', '6', '*', 
    '1', '2', '3', '-', 
    '+', '0', '.', '='
];

// Reference to the display input field
const display = document.getElementById('display');

// Reference to the buttons container
const buttonsContainer = document.getElementById('buttons');

buttons.forEach(button => {
    const buttonElement = document.createElement('button');
    
    // Set the button text
    buttonElement.textContent = button;
    
    // Add the base button class
    buttonElement.classList.add('button');
    
    // Conditionally add the 'equals' class if the button text is "="
    if (button === "=") {
        buttonElement.classList.add('equals');
    } else if (['+', '-', '*', '/'].includes(button)) {
        buttonElement.classList.add('operators');
    }
    
    // Add the button to the container
    buttonsContainer.appendChild(buttonElement);

    // Add event listener for button click
    buttonElement.addEventListener('click', () => handleButtonClick(button));
});



let number1 = "";
let number2 = "";
let operator = "";

function handleButtonClick(button) {
    if (button === 'C') { // Check if we selected 'C' which clears everything
        // Clear everything
        number1 = "";
        number2 = "";
        operator = "";
        display.value = "";
    } else if (button === '=') { // then we check if it is a equals sign
        // Perform the calculation
        if (number1 && number2 && operator) { // if we have all three, perform calculations based on operator and use the functions derived earlier
            const num1 = parseFloat(number1);
            const num2 = parseFloat(number2);
            let result;
            switch (operator) {
                case '+':
                    result = add(num1, num2);
                    break;
                case '-':
                    result = subs(num1, num2);
                    break;
                case '*':
                    result = multiply(num1, num2);
                    break;
                case '/':
                    result = divide(num1, num2);
                    break;
            }
            display.value = result;  // Add to String to display
            number1 = result.toString();
            number2 = "";
            operator = "";
        }
    } else if (['+', '-', '*', '/'].includes(button)) { // If not clear or equals, we assign the operator and the numbers based on if it is after operator or not.
        // Set the operator if one is not already set
        if (!operator) {
            operator = button;
            display.value += ` ${button} `;
        }
    } else {
        // Append to the correct number
        if (operator) {
            number2 += button;
            display.value += button;
        } else {
            number1 += button;
            display.value += button;
        }
    }
}

