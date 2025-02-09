const regBtn = document.querySelector('.slider-register-btn');
const logBtn = document.querySelector('.slider-login-btn');

const container = document.querySelector('.container');

regBtn.addEventListener('click', () => {
    container.classList.toggle('active');
});

logBtn.addEventListener('click', () => {
    container.classList.toggle('active');
});

