$(document).ready(function()
{
    $.getJSON('http://ip-api.com/json', function(data)
    {
        myweather(data);
    });

    function myweather(data)
    {
        var cityName = data.city;

        function kelvinToCelsius(kelvin)
        {
            return Math.round(kelvin - 273.15);
        }

        function msToKnots(ms)
        {
            return Math.floor(ms * 1.9438444924574) + ' knots';
        }

        function weathertype(input)
        {
            if (input.toLowerCase() == "clear")
            {
                return 'wi wi-day-sunny" style = "color: #26BD7B"';
            }
            else if (input.toLowerCase() == "clouds")
            {
                return 'wi wi-day-cloudy" style = "color: #26BD7B"';
            }
            else if (input.toLowerCase() == "rain")
            {
                return 'wi wi-day-rain" style = "color: #26BD7B"';
            }
            else if (input.toLowerCase() == "snow")
            {
                return 'wi wi-day-snow" style = "color: #26BD7B"';
            }
        }
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=b89206d83ebcd9505f44d3a101e3928e", function(json)
        {
            $("#location").html(json.name + ", " + json.sys.country);
            $("#summary").html('<i class = ' + '"' + weathertype(json.weather[0].main) + '></i>');
            $("#temperature").html('<span id = "number">' + kelvinToCelsius(json.main.temp) + '</span>' + '<span id = "temp"><a id = "convert" href = "#"> &deg;<span id = "symbol">C</span></a></temp>');
            if (json.hasOwnProperty("rain"))
            {
                $("#rain").html(json.rain[0])
            }
            else
            {
                $("#rain").remove();
            };
            if (json.hasOwnProperty("snow"))
            {
                $("#snow").html(json.snow[0])
            }
            else
            {
                $("#snow").remove();
            };
        });
    };
    $("body").on("click", "#convert", function()
    { //test event handling on IE9
        var temp = Number($("#number").text());
        if ($('#symbol').text() === 'F')
        {
            // convert to kelvinToCelsius
            temp = Math.round((temp - 32) * 5 / 9);
            $('#number').text(temp);
            $('#symbol').text('C');
        }
        else
        {
            // convert to fahrenheit
            temp = Math.round(temp * 9 / 5 + 32);
            $('#number').text(temp);
            $('#symbol').text('F');
        }
    });
});