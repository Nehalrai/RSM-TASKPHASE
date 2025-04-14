const display = document.getElementById('display');
const keys = document.querySelectorAll('.key');

let expression = '';

keys.forEach(key => {
  key.addEventListener('click', () => {
    const value = key.textContent;

    if (key.classList.contains('del')) {
      expression = expression.slice(0, -1);
    } else if (key.classList.contains('reset')) {
      expression = '';
    } else if (key.classList.contains('equal')) {
      try {
        const formattedExpression = expression.replace(/x/g, '*');
        expression = eval(formattedExpression).toString();
      } catch {
        expression = 'Error';
      }
    } else {
      expression += value;
    }

    display.textContent = expression || '0';
  });
});

// Theme Toggle
const themeRange = document.getElementById('theme-range');

themeRange.addEventListener('input', () => {
  document.body.setAttribute('data-theme', themeRange.value);
});
