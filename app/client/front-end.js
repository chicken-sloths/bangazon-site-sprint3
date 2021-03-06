'use strict';

$('.deleteRecommendation').on('click', event => {
  let productId = event.target.dataset.id;
  $.ajax({
    url: `/recommendations/${productId}`,
    type: 'DELETE',
    success: result => {
      const num = $('#numOfRecommendations').text()
      $('#numOfRecommendations').text(`${num - 1}`);
      $(`.product[data-id=${productId}]`).remove();
      $('.row:empty').html('<h2>No recommendations, sorry!</h2>');
    }
  });
});

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
  let productOrderId = event.target.dataset.productOrderId;
  $.ajax({
    url: `/cart/${productOrderId}`,
    type: 'DELETE',
    success: result => {
        $(`.product[data-product-order-id=${productOrderId}]`).remove();
        $('.row:empty')
          .html('<h2>Add some items to your cart</h2>')
          .next().attr('href', '/')
          .children().text('Product Categories');
    }
  });
});

$('#cancelOrderBtn').on('click', (event) => {
  let activeOrderId = event.target.dataset.id;
  $.ajax({
    url: `/cart/cancel/${activeOrderId}`,
    type: 'DELETE',
    success: result => {
      window.location = '/cart';
    }
  });
});

$("#recommendBtn").on('click', event => {
  $("#recommendInput").toggleClass('d-none');
});