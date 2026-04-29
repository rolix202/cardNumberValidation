// DOM elements
const form = document.getElementById('cardForm');
const cardInput = document.getElementById('cardNumber');
const validateBtn = document.getElementById('validateBtn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');
const resultDiv = document.getElementById('result');
const resultMessage = document.getElementById('resultMessage');

function formatCardNumber(value) {
    const digits = value.replace(/\D/g, '');

    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');

    return formatted;
}

cardInput.addEventListener('input', (e) => {
    const value = e.target.value;
    const cursorPosition = e.target.selectionStart;

    const formatted = formatCardNumber(value);

    e.target.value = formatted;

    const newCursorPosition = cursorPosition + (formatted.length - value.length);
    e.target.setSelectionRange(newCursorPosition, newCursorPosition);
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cardNumber = cardInput.value.replace(/\s/g, '');

    if (!cardNumber) {
        showResult('error', 'Invalid Input', 'Please enter a card number');
        return;
    }

    setLoading(true);

    try {
        const response = await fetch('/api/v1/card/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cardNumber }),
        });

        const data = await response.json();

        if (response.ok) {
            showResult('success', data.message);
        } else {
            showResult('error', data.message);
        }

    } catch (error) {
        console.error('Error:', error);
        showResult('error', 'Connection Error', 'Unable to connect to the validation service. Please try again.');
    } finally {
        setLoading(false);
    }
});

function showResult(type, message) {
    resultDiv.className = `result ${type}`;
    resultDiv.style.display = 'block';
    resultMessage.textContent = message;
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function setLoading(isLoading) {
    validateBtn.disabled = isLoading;

    if (isLoading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
    } else {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

cardInput.addEventListener('input', () => {
    if (resultDiv.style.display !== 'none') {
        resultDiv.style.display = 'none';
    }
});
