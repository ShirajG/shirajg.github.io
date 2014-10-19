$(document).ready(function(){

var techMenu = $(".menus li:first-child");
var cultureMenu = $(".menus li:nth-child(2)");
var about = $(".menus li:last-child");
var technical = $('#technical');
var cultural = $('#cultural');
var portrait = $('.portrait');
technical.hide();
cultural.hide();

techMenu.click(function () {
  technical.slideToggle('fast');
  cultural.hide();
  techMenu.addClass('jquery');
  cultureMenu.removeClass('jquery');
  about.removeClass('jquery');
});
cultureMenu.click(function () {
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
  $(window).scrollTop($(document).height());
});
cultural.click(function (){
  cultural.slideUp('fast');
  $(window).scrollTop($(document).height());
});




});