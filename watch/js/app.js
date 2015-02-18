jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

$(function(){
    var scrolled;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();

    var $hours = $('#hour-hand'); 
    var $minutes = $('#minute-hand'); 
    var $seconds = $('#second-hand');

    // Hands have to be initially rotated -85 degrees
    // in the CSS to line up with the photo.
    // This lets our JS know about that.
    var secondsPos = -85;
    var minutesPos = -85; 
    var hoursPos = -85;

    // Initializes the hands on the watch to 
    // the users current time.
    var currentDate = new Date;
    var hours = currentDate.getHours() % 12;
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    hoursPos += (hours * 30) + (minutes/2);
    $hours.rotate(hoursPos);
    minutesPos += minutes * 6;
    $minutes.rotate(minutesPos);
    secondsPos += seconds * 6;
    $seconds.rotate(secondsPos);

    // Sets the watch ticking,
    // checks to see if the minute hand
    // or hour hand need to move
    setInterval(function(){
        secondsPos += 0.06;
        $seconds.rotate(secondsPos);

        minutesPos += 0.001;
        $minutes.rotate(minutesPos);
    },10)

    setInterval(function(){
        hoursPos += .001;
        $hours.rotate(hoursPos);
    },1200)

    $(window).scroll(function(e){
        scrolled = true;
    })

    setInterval(function(){
        if(scrolled){
            hideHeader();
            scrolled = false;
        }
    },250)

    function hideHeader(){
        var st = $(this).scrollTop();

        if( st > lastScrollTop ){
            $('header').fadeOut('slow');
        }
        else{
            if(st < 5){
                $('header').fadeIn('slow');
            }
        }
    }
})

