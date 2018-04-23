'use strict';

$(".deleteProdBtn").on('click', (event) => {
  let productId = event.target.id;
  $.ajax({
    url: `/products/manage/remove/${productId}`,
    type: 'PATCH',
    success: function(result) {
        $(`#productCard${productId}`).remove();
    }
  });
});

$(".deletePayOpBtn").on('click', (event) => {
  let payOpId = event.target.dataset.id;
  $.ajax({
    url: `/payment/${payOpId}`,
    type: 'DELETE',
    success: result => {
        $(`.payment-option[data-id=${payOpId}]`).remove();
    }
  });
});