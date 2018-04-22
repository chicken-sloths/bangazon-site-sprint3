'use strict';

$(".deleteProdBtn").on('click', (event) => {
  let productId = event.target.id;
  $.ajax({
    url: `http://localhost:8080/products/manage/${productId}`,
    type: 'PATCH',
    success: function(result) {
        $(`#productCard${productId}`).remove();
    }
  });
});