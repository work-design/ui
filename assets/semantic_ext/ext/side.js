$('#test_side').click(function(){
  $('.ui.side').toggleClass('invisible');
  $('.ui.side .ui.menu').toggleClass('icon')
});

$('.ui.accordion').accordion({
  selector: {
    trigger: '.title'
  }
});
