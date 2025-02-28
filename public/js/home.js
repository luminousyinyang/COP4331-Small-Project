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

// Validate phone format
function validatePhoneFormat(phoneValue) {
  const phonePattern = /^\(\d{3}\)-\d{3}-\d{4}$/;
  return phonePattern.test(phoneValue);
}

// Add validation to existing functions
function validateAndCreateContact() {
  const phoneInput = document.getElementById('phone-num');
  if (!validatePhoneFormat(phoneInput.value)) {
    document.getElementById('add-contact-result').textContent = 'Please enter a valid phone number: (XXX)-XXX-XXXX';
    document.getElementById('add-contact-result').style.color = 'red';
    return false;
  }
  // If valid, continue with original function
  return createContact();
}

function validateAndUpdateContact() {
  const phoneEditInput = document.getElementById('phone-num-edit');
  if (!validatePhoneFormat(phoneEditInput.value)) {
    document.getElementById('edit-contact-result').textContent = 'Please enter a valid phone number: (XXX)-XXX-XXXX';
    document.getElementById('edit-contact-result').style.color = 'red';
    return false;
  }
  // If valid, continue with original function
  return updateContact();
}

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', function() {
  // Add formatters to inputs
  const phoneInput = document.getElementById('phone-num');
  const phoneEditInput = document.getElementById('phone-num-edit');
  
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      formatPhoneNumber(this);
    });
  }
  
  if (phoneEditInput) {
    phoneEditInput.addEventListener('input', function() {
      formatPhoneNumber(this);
    });
  }
  
  // Replace onclick handlers
  const addButton = document.querySelector('#add-ct-modal button[type="submit"]');
  const editButton = document.querySelector('#edit-ct-modal button[type="submit"]');
  const logOutButton = document.querySelector('.log-out-button');

  if (addButton) {
    addButton.onclick = validateAndCreateContact;
  }
  
  if (editButton) {
    editButton.onclick = validateAndUpdateContact;
  }
  
  if(logOutButton)
    {
      logOutButton.addEventListener('click', doLogout);
      console.log("Button clicked!");
    }

});