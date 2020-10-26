const form = document.querySelector('form');
const inputs = document.querySelectorAll('.inputs input');
const btn = document.querySelector('.verify-btn');

form.addEventListener('input', handleInput);
inputs[0].addEventListener('paste', handlePaste);

// Handle backspace
form.onkeydown = function(e) {
  const key = e.keyCode || e.charCode;
  const input = e.target;

  if ((key == 8 || key == 46) && input.previousElementSibling) {
    if (input.value) input.value = '';
    input.previousElementSibling.select();
    input.previousElementSibling.focus();
    return false;
  }
}

function handlePaste(e) {
  const paste = e.clipboardData.getData('text');

  // TO DO:
  // auto focus btn when all filled
  inputs.forEach((input, i) => {
    let value = paste[i];

    // Check input and only allow numbers
    if (!isNumber(value)) value = '';
    input.value = value;

    // Change focus
    if (input.nextElementSibling) {
      input.focus();
    }

    if (!input.nextElementSibling) {
      btn.focus();
    } else {
      input.focus();
    }
  });

}

function handleInput(e) {
  const input = e.target;

  // Check input and only allow numbers
  if (!isNumber(input.value)) {
    input.value = '';
    return;
  }

  // Continue to next input
  if (input.value && input.nextElementSibling) {
    input.nextElementSibling.select();
    input.nextElementSibling.focus();
  } else if (input.value && !input.nextElementSibling) {
    // Auto focus button when all inputs are filled
    btn.focus();
  }
}

function isNumber(n) {
  // Only accept strings
  if (typeof n != 'string') return false
  return !isNaN(n) && !isNaN(parseFloat(n));
}
