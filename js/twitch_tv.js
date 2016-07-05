var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
var user = "";
$.each(streamers, function(index, value)
{
    $.getJSON('https://api.twitch.tv/kraken/streams/' + value + '?callback=?', function(data)
    {
        user = value;
        if (data.hasOwnProperty("error"))
        {
            var state = "Closed";
            var descr = "";
            var logo = "";
        }
        else
        {
            if (data.stream !== null)
            {
                var state = "Online";
                var descr = data.stream.game;
                var logo = data.stream.channel.logo;
            }
            else
            {
                var state = "Offline";
                var descr = "";
                var logo = "";
            }
        }
        $(".content").append('<li class = "' + state + '"><img class = "logo" src = "' + logo + '"></img><div class = "row"><a class = "user" target = "_blank" href = "https://www.twitch.tv/' + user + '">' + user + '</a><p class = "descr">' + descr + '</p><p class = "state">' + state + '</p></li></div>');
    });
});