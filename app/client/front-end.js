'use strict';

console.log($(".deleteProd"));

// const deleteProdBtn = document.getElementsByClassName('deleteProd');
// deleteProdBtn.addEventListener('click', () => {

// });

$('#staticDiv').on('click', 'yourSelector', function() {
  //do something
});
$(window).on('click', $(".deleteProd"), () => {
  console.log("hello");
  $.ajax({
    url: 'products/manage/2',
    type: 'DELETE',
    success: function(result) {
        console.log("deleted");
    }
});
})
// $(".deleteProd").click(() => {
//   console.log("hello");
//   $.ajax({
//     url: '/manage/:id',
//     type: 'DELETE',
//     success: function(result) {
//         console.log("deleted");
//     }
// });
// })