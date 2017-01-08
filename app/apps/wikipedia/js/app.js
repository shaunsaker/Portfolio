$(document).keypress(function(enter)
{
    if (enter.which == 13)
    {
        enter.preventDefault();
        var keywords = $("#search").val();

        function getJSON()
        {
            return $.ajax(
            {
                url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=&search=' + keywords + '&limit=10&namespace=0&format=json',
                dataType: 'jsonp'
            });
        }
        var tempArr = [];
        var info = getJSON();
        info.done(function(data)
        {
            var contents = $("#contents");
            contents.html("");
            contents.append("<span>");
            for (var i = 0; i < 10; i++)
            {
                if (data[3][i] === undefined)
                {
                    return;
                }
                contents.append("<div class='content'><a href='" + data[3][i] + "' target='_blank' class='linkToContent'><button class='link'><h3 class='title'>" + data[1][i] + "</h3><p class='description'>" + data[2][i] + "</p></h3></button></a></div></span>");
            }
        });
    }
});