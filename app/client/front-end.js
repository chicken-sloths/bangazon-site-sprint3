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