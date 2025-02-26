const color1 = '#D6DAE6';
const color2 = '#ebeae8';
const color5 = '#1d2c4b';
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

// Format phone number input for both create and edit forms
function formatPhoneNumber(input) {
  // Strip all non-numeric characters
  let phoneNumber = input.value.replace(/\D/g, '');
  
  // Limit to 10 digits
  phoneNumber = phoneNumber.substring(0, 10);
  
  // Format as (XXX)-XXX-XXXX
  if (phoneNumber.length > 0) {
    if (phoneNumber.length <= 3) {
      phoneNumber = '(' + phoneNumber;
    } else if (phoneNumber.length <= 6) {
      phoneNumber = '(' + phoneNumber.substring(0, 3) + ')-' + phoneNumber.substring(3);
    } else {
      phoneNumber = '(' + phoneNumber.substring(0, 3) + ')-' + 
                   phoneNumber.substring(3, 6) + '-' + 
                   phoneNumber.substring(6);
    }
  }
  
  // Update the input value
  input.value = phoneNumber;
}

// Add event listeners to phone inputs
document.addEventListener('DOMContentLoaded', function() {
  // For the add contact form
  const phoneInput = document.getElementById('phone-num');
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      formatPhoneNumber(this);
    });
  }
  
  // For the edit contact form
  const phoneEditInput = document.getElementById('phone-num-edit');
  if (phoneEditInput) {
    phoneEditInput.addEventListener('input', function() {
      formatPhoneNumber(this);
    });
  }
});

// Function to validate phone format before submission
function validatePhoneFormat(phoneValue) {
  // Check if phone matches the format (XXX)-XXX-XXXX
  const phonePattern = /^\(\d{3}\)-\d{3}-\d{4}$/;
  return phonePattern.test(phoneValue);
}

// Override form submission to enforce phone format
document.addEventListener('DOMContentLoaded', function() {
  // For the add contact form
  const addForm = document.querySelector('#add-ct-modal .modal-form');
  if (addForm) {
    addForm.addEventListener('submit', function(event) {
      const phoneInput = document.getElementById('phone-num');
      if (!validatePhoneFormat(phoneInput.value)) {
        event.preventDefault();
        document.getElementById('add-contact-result').textContent = 'Please enter a valid phone number: (XXX)-XXX-XXXX';
        document.getElementById('add-contact-result').style.color = 'red';
      }
    });
  }
  
  // For the edit contact form
  const editForm = document.querySelector('#edit-ct-modal .modal-form');
  if (editForm) {
    editForm.addEventListener('submit', function(event) {
      const phoneEditInput = document.getElementById('phone-num-edit');
      if (!validatePhoneFormat(phoneEditInput.value)) {
        event.preventDefault();
        document.getElementById('edit-contact-result').textContent = 'Please enter a valid phone number: (XXX)-XXX-XXXX';
        document.getElementById('edit-contact-result').style.color = 'red';
      }
    });
  }
});
