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

function incrementQty(wine) {
  const incrementButton = document.querySelector(`button[data-wine="${wine}"]`);
  const qty = incrementButton.dataset.qty;
  var headers = {
    "Content-Type": "application/json",
    "Access-Control-Origin": "*"
 }
  var data = {
    wine,
    qty
  }
  fetch("/api/increment-qty", {
      method: "POST",
      headers: headers,
      body:  JSON.stringify(data)
  })
  .then(function(response){
      return response.json();
  })
  .then(function(data){
      // console.log(data);
      if (data) {
        const thisQty = document.querySelector(`.quantity[data-wine="${wine}"]`);
        const qtyVal = thisQty.querySelector('p');
        qtyVal.textContent = parseInt(qtyVal.textContent) + 1;
        incrementButton.dataset.qty = qty + 1;
      }
  });
}
//qtyVal.value = parseInt(qty.value) + 1; ===         qtyVal.value = +qty.value + 1;



function decrementQty(wine) {
  const incrementButton = document.querySelector(`button[data-wine="${wine}"]`);
  const qty = incrementButton.dataset.qty;
  var headers = {
    "Content-Type": "application/json",
    "Access-Control-Origin": "*"
 }
  var data = {
    wine,
    qty
  }
  console.log(qty);
  console.log(this.qty);
  if (+qty > 0) {
    fetch("/api/decrement-qty", {
        method: "POST",
        headers: headers,
        body:  JSON.stringify(data)
    })
    .then(function(response){
          return response.json();
      })
      .then(function(data){
          // console.log(data);
          if (data) {
            const thisQty = document.querySelector(`.quantity[data-wine="${wine}"]`);
            const qtyVal = thisQty.querySelector('p');
            qtyVal.textContent = parseInt(qtyVal.textContent) - 1;
            incrementButton.dataset.qty = +qty - 1;
          }
      });

  }
}
