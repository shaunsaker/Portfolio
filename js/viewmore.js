$(document).ready(function()
{
    var depth = 3;
    var maxDepth = 8;
    var speed = 750;
    $('.viewless').hide();
    $('.viewmore').click(function()
    {
        if (depth < maxDepth)
        {
            depth++
            $('#port-' + depth).fadeIn(speed);
            $('.viewless').fadeIn(speed);
            if (depth === maxDepth)
            {
                $('.viewmore').hide();
            }
            $('html,body').animate(
            {
                scrollTop: ($('#port-' + depth).offset().top) - 30
            }, speed);
        }
    });
    $('.viewless').click(function()
    {
        if (depth > 1)
        {
            depth--
            $('#port-' + (depth + 1)).hide();
            $('.viewmore').fadeIn(speed);
            if (depth === 1)
            {
                $('.viewless').hide();
            }
            $('html,body').animate(
            {
                scrollTop: ($('#port-' + depth).offset().top) - 30
            }, 375);
        }
    });
});