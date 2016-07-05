jQuery(document).ready(function()
{
    var duration = 750;
    jQuery(window).scroll(function()
    {
        if (jQuery(this).scrollTop() >= $("#portfolio").offset().top)
        {
            jQuery("#container-nav").css("display", "none");
            jQuery("#container-nav").css("position", "fixed");
            jQuery("#container-nav").css("border-bottom", "1px solid rgba(0, 0, 0, 0.10)");
            jQuery("#container-nav").fadeIn(duration);
            jQuery("#container-nav").css("display", "");
        }
        if (jQuery(this).scrollTop() < $("#portfolio").offset().top)
        {
            jQuery("#container-nav").css("position", "");
            jQuery("#container-nav").css("border-bottom", "");
            jQuery(".back-to-top").fadeOut(duration);
        }
    });
});