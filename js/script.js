require(['jquery','dropDown','ajaxLinks'],function(jquery,dropDown,ajaxLinks){
  $(document).ready(function(){

    var $techMenu = $(".menus li:first-child"),
    $cultureMenu = $(".menus li:nth-child(2)"),
    $about = $(".menus li:last-child"),
    $technical = $('#technical'),
    $cultural = $('#cultural'),
    $links = $('#technical a, #cultural a, #about')

    // Enables navigating through history with
    // Back/Forward buttons
    $(window).on('popstate',function(event){
      getViaAjax(location.pathname)
    })
    
    $techMenu.click(function (event) {
      event.preventDefault()
      $technical.slideToggle('fast')
      $cultural.hide()
      toggleActive([$techMenu,$cultureMenu,$about])
    })
    $cultureMenu.click(function (event) {
      event.preventDefault()
      $cultural.slideToggle('fast')
      $technical.hide()
      toggleActive([$cultureMenu,$techMenu,$about])
    })
    $about.click(function () {
      $technical.hide()
      $cultural.hide()
      toggleActive([$about,$cultureMenu,$techMenu])
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