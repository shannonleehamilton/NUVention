$('.ski button').click(function(event) {
   $('#c').text($(event.target).text())
   $('.box').toggleClass('active');
});