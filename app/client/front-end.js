'use strict';

$(window).on('click', $(".deleteProd"), (event) => {
  let $productId = event.target.id;
  $.ajax({
    url: `http://localhost:8080/products/manage/${$productId}`,
    type: 'PATCH',
    success: function(result) {
        console.log("deleted");
        $(`#productCard${$productId}`).remove();
    }
  });
});