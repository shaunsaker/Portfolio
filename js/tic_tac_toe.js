$(document).ready(function()
{
    var user;
    var pc;
    var positions = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //remove positions as game pc and user plays - pc chooses random - 5 removed as pc will always start here
    var state = true;
    $(document).on('click', '.clickable2', function()
    { //User chooses X/O and Pc makes first move
        user = $(event.target)[0].id;
        if (user === "X")
        {
            pc = "O";
        }
        else
        {
            pc = "X";
        }
        $('.hidden').removeClass('hidden');
        $('.buttons').addClass("hidden");
        $('.description').addClass("hidden");
        pcMove();
    });
    $(document).on('click', '.clickable', function()
    { //additional moves
        if (state)
        {
            var userChoice = parseInt($(event.target)[0].id); //convert string to number
            var index = positions.indexOf(userChoice);
            positions.splice(index, 1);
            document.getElementById(userChoice).innerHTML = user;
            document.getElementById(userChoice).className = "user";
            checkWin();
            if (state)
            {
                pcMove();
            };
            if (state)
            {
                checkLose();
            };
            if (state)
            {
                checkDraw();
            };
        };
    });
    var pcMove = function()
    {
        var random = positions[Math.floor(Math.random() * positions.length)];
        var index = positions.indexOf(random);
        positions.splice(index, 1);
        setTimeout(function()
        {
            document.getElementById(random).innerHTML = pc;
        }, 750);
        document.getElementById(random).className = "pc";
    }
    var checkWin = function()
    {
        checkRow('user');
        checkColumn('user');
        checkDiagonals('user');
    }
    var checkLose = function()
    {
        //checkrows
        checkRow('pc');
        checkColumn('pc');
        checkDiagonals('pc');
    }
    var checkDraw = function()
    {
        if (state && positions.length === 0)
        {
            state = false;
            setTimeout(function()
            {
                $('.draw').removeClass("hidden");
            }, 750);
            reset();
        }
    };
    var checkRow = function(input)
    {
        var temp;
        if (input === 'user')
        {
            temp = 'won';
        }
        else if (input === 'pc')
        {
            temp = 'lost';
        }
        for (i = 1; i < 8; i += 3)
        {
            if (document.getElementById(i).className === input && document.getElementById(i + 1).className === input && document.getElementById(i + 2).className === input)
            {
                state = false;
                document.getElementById(i).className = temp;
                document.getElementById(i + 1).className = temp;
                document.getElementById(i + 2).className = temp;
                $('.' + temp).removeClass("hidden");
                reset();
                break;
            };
        };
    };
    var checkColumn = function(input)
    {
        var temp;
        if (input === 'user')
        {
            temp = 'won';
        }
        else if (input === 'pc')
        {
            temp = 'lost';
        }
        for (i = 1; i < 4; i++)
        {
            if (document.getElementById(i).className === input && document.getElementById(i + 3).className === input && document.getElementById(i + 6).className === input)
            {
                state = false;
                setTimeout(function()
                {
                    document.getElementById(i).className = temp;
                    document.getElementById(i + 3).className = temp;
                    document.getElementById(i + 6).className = temp;
                    $('.' + temp).removeClass("hidden");
                }, 750);
                reset();
                break;
            }
        }
    };
    var checkDiagonals = function(input)
    {
        var temp;
        if (input === 'user')
        {
            temp = 'won';
        }
        else if (input === 'pc')
        {
            temp = 'lost';
        }
        //check diagonal 1
        if (document.getElementById(1).className === input && document.getElementById(5).className === input && document.getElementById(9).className === input)
        {
            state = false;
            setTimeout(function()
            {
                document.getElementById(1).className = temp;
                document.getElementById(5).className = temp;
                document.getElementById(9).className = temp;
                $('.' + temp).removeClass("hidden");
            }, 750);
            reset();
        }
        //check diagonal 2
        else if (document.getElementById(3).className === input && document.getElementById(5).className === input && document.getElementById(7).className === input)
        {
            state = false;
            setTimeout(function()
            {
                document.getElementById(3).className = temp;
                document.getElementById(5).className = temp;
                document.getElementById(7).className = temp;
                $('.' + temp).removeClass("hidden");
            }, 750);
            reset();
        }
    }
    var reset = function()
    {
        setTimeout(function()
        {
            location.reload(true);
        }, 1500);
    }
});