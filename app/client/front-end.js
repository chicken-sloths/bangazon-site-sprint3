'use strict';

$(window).on('click', $(".deleteProd"), (event) => {
  let productId = event.target.id;
  $.ajax({
    url: `http://localhost:8080/products/manage/${productId}`,
    type: 'DELETE',
    return: 'false',
    success: function(result) {
        console.log("deleted");
    }
  });
});