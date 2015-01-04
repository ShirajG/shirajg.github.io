require(['/js/jquery.min.js'])

$(document).ready(function(){
  var techMenu = $(".menus li:first-child"),
  cultureMenu = $(".menus li:nth-child(2)"),
  about = $(".menus li:last-child"),
  technical = $('#technical'),
  cultural = $('#cultural'),
  portrait = $('.portrait'),
  links = $('#technical a, #cultural a, #about')
  technical.hide();
  cultural.hide();

  techMenu.click(function (event) {
    event.preventDefault();
    technical.slideToggle('fast');
    cultural.hide();
    techMenu.addClass('jquery');
    cultureMenu.removeClass('jquery');
    about.removeClass('jquery');
  });
  cultureMenu.click(function (event) {
    event.preventDefault();
    technical.slideToggle('fast');
    cultural.slideToggle('fast');
    technical.hide();
    cultureMenu.addClass('jquery');
    techMenu.removeClass('jquery');
    about.removeClass('jquery');
  });
  about.click(function () {
    technical.hide();
    cultural.hide();
    about.addClass('jquery');
    techMenu.removeClass('jquery');
    cultureMenu.removeClass('jquery');
  });
  technical.click(function (){
    technical.slideUp('fast');
    // $(window).scrollTop($(document).height());
  });
  cultural.click(function (){
    cultural.slideUp('fast');
    // $(window).scrollTop($(document).height());
  });
  links.click(function(event){
    event.preventDefault()
    console.log(event)
    $.get(event.target.href, function(response){
      newPost = $(response).filter('#post')
      $('#post').replaceWith(newPost)
      // console.log($rawResponse)
      // debugger

    })
  })
});
