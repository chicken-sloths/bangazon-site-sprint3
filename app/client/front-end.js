'use strict';

$(".deleteProdBtn").on('click', (event) => {
  let productId = event.target.dataset.id;
  $.ajax({
    url: `/products/manage/remove/${productId}`,
    type: 'PATCH',
    success: result => {
        $(`.product[data-id=${productId}]`).remove();
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

$(".deleteFromCart").on('click', (event) => {
  let productId = event.target.dataset.id;
  $.ajax({
    url: `/cart/remove/${productId}`,
    type: 'DELETE',
    success: result => {
        $(`.prodcut[data-id=${productId}]`).remove();
    }
  });
});
