const openModalButton = document.querySelectorAll('[data-modal-target]');
const closeModalButton = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');
const form = document.querySelector('form');
const titleModal = document.querySelector('#modal-1 .modal-header .title');
const paragraphModal = document.querySelector('#modal-1 .modal-body p');

openModalButton.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (form.checkValidity()) {
      const modal = document.querySelector(button.dataset.modalTarget);
      openModal(modal);
    } else {
      openModal(modal);
    }
    event.preventDefault();
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach((modal) => {
      closeModal(modal);
    });
  }
});

closeModalButton.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
}
