// Open the add-contact modal
const addContactModal = document.querySelector('#add-ct-modal');
const closeAddModal = document.querySelector('#x-add-modal');

addContactButton.addEventListener('click', () => addContactModal.showModal());
addContactIcon.addEventListener('click', () => addContactModal.showModal());
closeAddModal.addEventListener('click', () => addContactModal.close());

// Open the edit-contact modal
const editContactModal = document.querySelector("#edit-ct-modal");
const closeEditModal = document.querySelector("#x-edit-modal");

// Get all the edit icons
const editIconsList = document.querySelectorAll(".edit-contact-icon");

editIconsList.forEach((icon) => {
    icon.addEventListener('click', () => editContactModal.showModal());
});
closeEditModal.addEventListener('click', () => editContactModal.close());


// Open the delete confirmation popup 
const deleteContactModal = document.querySelector("#delete-contact-modal");
const closeDeleteModalList = document.querySelectorAll(".cancel");
const deleteIconsList = document.querySelectorAll('.delete-contact-icon');

deleteIconsList.forEach((icon) => {
    icon.addEventListener('click', () => deleteContactModal.showModal());
});

closeDeleteModalList.forEach((button) => {
    button.addEventListener('click', () => deleteContactModal.close());
});