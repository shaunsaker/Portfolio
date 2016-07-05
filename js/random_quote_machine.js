function updateQuote()
{
    $.ajax(
    {
        dataType: "json",
        method: 'post',
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
        headers:
        {
            'X-Mashape-Key': 'naSTE5SwvomshHN0ZmjmLFwIHKyjp1iLE41jsnoC9Y6vac593H'
        },
        success: function(data)
        {
            $('#author').text(data.author); //fetching data
            $('#quote').text(data.quote);
        }
    });
}
$(document).ready(function()
{
    updateQuote();
    $('#new-quote').click(function()
    {
        updateQuote();
    });
    $('#tweet').click(function()
    {
        var quoteText = $('#quote').text();
        var quoteAuthor = $('#author').text();
        var url = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + quoteText + ' ' + quoteAuthor;
        window.open(url);
        return false;
    });
});