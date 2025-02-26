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

//Validates a phone number against the format (123)-456-7890

function validatePhoneNumber(phoneNumber) {
    const phonePattern = /^\(\d{3}\)-\d{3}-\d{4}$/;
    return phonePattern.test(phoneNumber);
  }
  
  /**
   * Shows an error popup for invalid phone number
   */
  function showPhoneError(inputId, errorId) {
    let errorElement = document.getElementById(errorId);
    
    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.id = errorId;
      errorElement.style.color = "red";
      errorElement.style.fontSize = "0.8rem";
      errorElement.style.marginTop = "5px";
      errorElement.style.fontWeight = "bold";
      
      const phoneInput = document.getElementById(inputId);
      if (phoneInput) {
        const parentDiv = phoneInput.parentElement;
        parentDiv.appendChild(errorElement);
      }
    }
    
    errorElement.textContent = "Phone must be in format (123)-456-7890";
    
    setTimeout(() => {
      if (errorElement) {
        errorElement.textContent = "";
      }
    }, 3000);
    
    return false;
  }
  
  // Format phone number as user types
  
  function formatPhoneNumber(input) {
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    
    // Format as (XXX)-XXX-XXXX
    if (value.length > 0) {
      if (value.length <= 3) {
        value = '(' + value;
      } else if (value.length <= 6) {
        value = '(' + value.substring(0, 3) + ')-' + value.substring(3);
      } else {
        value = '(' + value.substring(0, 3) + ')-' + value.substring(3, 6) + '-' + value.substring(6, 10);
      }
    }
    
    input.value = value;
  }
  
  // Original createContact function with phone validation
  const originalCreateContact = createContact;
  createContact = function() {
    let newPhone = document.getElementById("phone-num").value;
    
    if (!validatePhoneNumber(newPhone)) {
      return showPhoneError("phone-num", "phone-error");
    }
    
    originalCreateContact();
  };
  
  // Original updateContact function with phone validation
  const originalUpdateContact = updateContact;
  updateContact = function() {
    let newPhone = document.getElementById("phone-num-edit").value;
    
    if (!validatePhoneNumber(newPhone)) {
      return showPhoneError("phone-num-edit", "phone-edit-error");
    }
    
    originalUpdateContact();
  };
  
  // Set up event listeners for phone fields
  document.addEventListener('DOMContentLoaded', function() {
    // Setup auto-formatting for phone field in add contact form
    const phoneInput = document.getElementById('phone-num');
    if (phoneInput) {
      phoneInput.addEventListener('input', function() {
        formatPhoneNumber(this);
      });
    }
    
    // Setup auto-formatting for phone field in edit contact form
    const phoneEditInput = document.getElementById('phone-num-edit');
    if (phoneEditInput) {
      phoneEditInput.addEventListener('input', function() {
        formatPhoneNumber(this);
      });
    }
  });
