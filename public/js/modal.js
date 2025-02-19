// Open the modal
const modalContainer = document.querySelector('#modal');
const closeModal = document.querySelector('#x-modal');

addContactButton.addEventListener('click', () => modalContainer.showModal());
closeModal.addEventListener('click', () => modalContainer.close());