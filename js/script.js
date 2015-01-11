require(['jquery','dropDown','ajaxLinks'],function(jquery,dropDown,ajaxLinks){
  $(document).ready(function(){

    var $techMenu = $("#tech"),
    $cultureMenu = $("#culture"),
    $home = $("#home"),
    $technical = $('#technical'),
    $cultural = $('#cultural'),
    $links = $('#technical a, #cultural a, #home')

    // Enables navigating through history with
    // Back/Forward buttons
    $(window).on('popstate',function(event){
      getViaAjax(location.pathname)
    })
    
    $techMenu.click(function (event) {
      event.preventDefault()
      $technical.slideToggle('fast')
      $cultural.hide()
      toggleActive([$techMenu,$cultureMenu,$home])
    })
    $cultureMenu.click(function (event) {
      event.preventDefault()
      $cultural.slideToggle('fast')
      $technical.hide()
      toggleActive([$cultureMenu,$techMenu,$home])
    })
    $home.click(function () {
      $technical.hide()
      $cultural.hide()
      toggleActive([$home,$cultureMenu,$techMenu])
    })
    $technical.click(function (){
      $technical.slideUp('fast')
    })
    $cultural.click(function (){
      $cultural.slideUp('fast')
    })
    $links.click(function(event){
      event.preventDefault()
      history.pushState(null,null,event.target.href)
      getViaAjax(event.target.href);
    })
  })
})