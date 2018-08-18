document.addEventListener('turbolinks:load', function(){

  function side1() {
    $('.ui.side').addClass('invisible');
    $('.ui.side .ui.menu').removeClass('accordion').addClass('icon');
    $('.ui.side .ui.menu .dropdown.icon').remove();
    $('.ui.side .ui.menu div.item:not(.header)').addClass('ui dropdown');
    $('.ui.dropdown.item').dropdown({on: 'hover'});
    $('.ui.side .ui.menu .item:not(.header)').removeClass('hidden');
  }

  function side2() {
    $('.ui.side').removeClass('invisible');
    $('.ui.side .ui.menu').addClass('accordion').removeClass('icon');
    $('.ui.side .ui.menu .item:not(.header)').removeClass('ui dropdown').dropdown('destroy');
    var title = $('.ui.side .ui.menu .title');
    title.children('i.dropdown.icon').remove();
    title.append('<i class="dropdown icon"></i>');
    $('.ui.accordion').accordion({selector: {trigger: '.title'}});
  }

  $('#close_side').click(function() {
    if ($('.ui.side').hasClass('invisible')) {
      window.localStorage.setItem('invisible', 'false');
      side2();
    } else {
      window.localStorage.setItem('invisible', 'true');
      side1();
    }
  });

  if (localStorage.getItem('invisible') === 'true') {
    side1();
  } else {
    side2();
  }

});


