'use strict';

$('.deleteProdBtn').on('click', (event) => {
  let productId = event.target.dataset.id;
  $.ajax({
    url: `/products/manage/${productId}`,
    type: 'DELETE',
    success: result => {
        $(`.product[data-id=${productId}]`).remove();
    }
  });
});

$('.deletePayOpBtn').on('click', (event) => {
  let payOpId = event.target.dataset.id;
  $.ajax({
    url: `/payment/${payOpId}`,
    type: 'DELETE',
    success: result => {
        $(`.payment-option[data-id=${payOpId}]`).remove();
    }
  });
});

$('.deleteFromCart').on('click', (event) => {
  let productOrderId = event.target.dataset.orderId;
  $.ajax({
    url: `/cart/${productOrderId}`,
    type: 'DELETE',
    success: result => {
        $(`.product[data-order-id=${productOrderId}]`).remove();
        $('.row:empty')
          .html('<h2>Add some items to your cart</h2>')
          .next().attr('href', '/')
          .children().text('Product Categories');
    }
  });
});
