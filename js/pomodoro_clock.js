var sessionMinutes = 25;
var sessionSeconds = 00;
var setMinutes = 25;
var breakMinutes = 5;
var time; //global variable for clearInterval
$(document).on('click', '.symbols', function(event)
{ //update html on page based on input
    event = event || window.event; //fix for IE9-
    var target = event.target || event.srcElement; //fix for IE9-
    var id = $(target)[0].id; //grab clicked id
    if (id === "breakPlus" && breakMinutes < sessionMinutes)
    {
        breakMinutes++;
    }
    else if (id === "breakMinus" && breakMinutes > 1)
    {
        breakMinutes--;
    }
    else if (id === "sessionPlus")
    {
        sessionMinutes++;
    }
    else if (id === "sessionMinus" && sessionMinutes > 1 && sessionMinutes > breakMinutes)
    {
        sessionMinutes--;
    }
    setMinutes = sessionMinutes;
    $('#sessionMinutes').html(sessionMinutes);
    $('#sessionMinutesWindow').html(sessionMinutes);
    $('.breakMinutes').html(breakMinutes);
});
var checkVal = function()
{
    if ($(event.target)[0].value === "START")
    {
        $(event.target)[0].value = "RESET";
        time = setInterval(timer, 1000);
    }
    else if ($(event.target)[0].value === "RESET")
    {
        clearInterval(time);
        $(event.target)[0].value = "START";
        sessionSeconds = 0;
        sessionMinutes = setMinutes;
        $('#sessionMinutes').html(setMinutes);
        $('#sessionSeconds').html('0' + sessionSeconds);
        $('.breakMinutes').html(breakMinutes);
    }
};

function timer()
{
    if (sessionSeconds > 0)
    {
        sessionSeconds--;
    }
    else if (sessionSeconds === 0)
    {
        sessionMinutes--;
        sessionSeconds = 59;
    }
    if (sessionMinutes >= 0 && sessionSeconds > 0)
    { //ensure that clock does not go into negatives
        if (sessionMinutes === 0)
        {
            $('#sessionMinutes').html('0' + sessionMinutes);
        }
        else
        {
            $('#sessionMinutes').html(sessionMinutes);
        }
        if (sessionSeconds < 10)
        {
            $('#sessionSeconds').html('0' + sessionSeconds); //add leading zero if <10
        }
        else
        {
            $('#sessionSeconds').html(sessionSeconds);
        }
    }
    else if (sessionMinutes === 0 && sessionSeconds === 0)
    {
        $.playSound('http://www.gravomaster.com/alarm/sounds/School_Bell'); //play timer sound when reaches zero
        clearInterval(time); //reset clock
        $('#start')[0].value = "START";
        sessionSeconds = 0;
        $('#sessionMinutes').html(setMinutes);
        $('#sessionSeconds').html('0' + sessionSeconds);
        $('.breakMinutes').html(breakMinutes);
    }
};