const color1 = '#f9c48b2f';
const color2 = '#ebeae8';
const color5 = '#583730';
const greenColor = 'rgb(105, 195, 105)'

// Change the icon color when mouse hovers over the button
const addContactButton = document.querySelector('#add-contact-btn');
const addContactIcon = document.querySelector('#icon-imHungry');

const defaultStyle = () => {
    addContactButton.style.backgroundColor = color1;
    addContactButton.style.color = color5;
    addContactIcon.style.color = 'black';
}

const hoverStyle = () => {
    addContactButton.style.backgroundColor = color5;
    addContactButton.style.color = color2
    addContactIcon.style.color = greenColor;
}

addContactButton.addEventListener('mouseenter', defaultStyle);
addContactButton.addEventListener('mouseleave', hoverStyle);

// Change the button color when mouse hovers over the icon
addContactIcon.addEventListener('mouseenter', defaultStyle);
addContactIcon.addEventListener('mouseleave', hoverStyle);