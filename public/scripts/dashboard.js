const addWineBtn = document.querySelector('.add-wine-button');
const addWineModal = document.querySelector('.add-wine');
addWineBtn.addEventListener('click', e => {
  addWineModal.classList.remove('hidden');
});
