jQuery(document).ready(function()
{
    var offset = 100;
    var duration = 750;
    jQuery(window).scroll(function()
    {
        if (jQuery(this).scrollTop() > offset)
        {
            jQuery(".back-to-top").fadeIn(duration);
        }
        else
        {
            jQuery(".back-to-top").fadeOut(duration);
        }
    });
    jQuery(".back-to-top").click(function(event)
    {
        event = event || window.event; //fix for IE9-
        event.preventDefault();
        jQuery("html, body").animate(
        {
            scrollTop: 0
        }, duration);
        return false;
    })
});