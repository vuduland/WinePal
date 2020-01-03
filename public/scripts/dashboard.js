const addWineBtn = document.querySelector('.add-wine-button');
const addWineModal = document.querySelector('.add-wine');
addWineBtn.addEventListener('click', e => {
  addWineModal.classList.remove('hidden');
});

const addNote = wineId => {
  const addNoteModal = document.querySelector('.add-note');
  addNoteModal.classList.remove('hidden');
  const wineIdField = addNoteModal.querySelector('.wine-id');
  wineIdField.value = wineId;
};



function changeOrder() {
  console.log(document.querySelector('#dicks').value);
  window.location.href = `/dashboard/${document.querySelector('#dicks').value}`;
}
