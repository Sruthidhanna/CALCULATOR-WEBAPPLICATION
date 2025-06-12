const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear');
const equalBtn = document.getElementById('equal');
const themeToggle = document.getElementById('themeToggle');
const historyList = document.getElementById('historyList');

let expression = "";

// Toggle theme
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Add button click handlers
buttons.forEach(button => {
  const value = button.getAttribute('data-value');

  if (value) {
    button.addEventListener('click', () => {
      // Convert ÷ and × to JS compatible operators
      if (value === '÷') {
        expression += '/';
      } else if (value === '×') {
        expression += '*';
      } else {
        expression += value;
      }
      display.value = expression;
    });
  }
});

// Clear button
clearBtn.addEventListener('click', () => {
  expression = "";
  display.value = "";
});

// Equal button
equalBtn.addEventListener('click', () => {
  try {
    const result = eval(expression);
    display.value = result;
    addToHistory(expression, result);
    expression = result.toString();
  } catch {
    display.value = "Error";
    expression = "";
  }
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (/[0-9+\-*/().]/.test(key)) {
    expression += key;
    display.value = expression;
  } else if (key === 'Enter') {
    try {
      const result = eval(expression);
      display.value = result;
      addToHistory(expression, result);
      expression = result.toString();
    } catch {
      display.value = "Error";
      expression = "";
    }
  } else if (key === 'Backspace') {
    expression = expression.slice(0, -1);
    display.value = expression;
  } else if (key === 'Escape') {
    expression = "";
    display.value = "";
  }
});

// History
function addToHistory(expr, result) {
  const li = document.createElement('li');
  li.textContent = `${expr} = ${result}`;
  li.addEventListener('click', () => {
    navigator.clipboard.writeText(result.toString())
      .then(() => alert("Copied: " + result));
  });
  historyList.prepend(li);
}
