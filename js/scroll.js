$(document).ready(function()
{
    // navigation click actions 
    $('.scroll-link').on('click', function(event)
    {
        event = event || window.event; //fix for IE9-
        event.preventDefault();
        var sectionID = $(this).attr("data-id");
        scrollToID('#' + sectionID, 750);
    });
    // scroll to top action - add button or keep header fixed
    $('.scroll-top').on('click', function(event)
    {
        event = event || window.event; //fix for IE9-
        event.preventDefault();
        $('html, body').animate(
        {
            scrollTop: 0
        }, 'slow');
    });
});
// scroll function
function scrollToID(id, speed)
{
    var offSet = -1;
    var targetOffset = $(id).offset().top - offSet;
    $('html,body').animate(
    {
        scrollTop: targetOffset
    }, speed);
}