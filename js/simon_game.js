$(document).ready(function()
{
    var colourArr = ['green', 'red', 'yellow', 'blue'];
    var pcMoves = [];
    var userMoves = [];
    var counter = 0;
    var strict = false;
    var gameState = true;
    $(document).on('click', '#strict', function()
    { //strict option block
        if (!strict)
        {
            strict = true;
            $('#strict').addClass('strict');
        }
        else
        {
            strict = false;
            $('#strict').removeClass('strict');
        }
    });
    $(document).on('click', '#start', function()
    { //start game block
        if (gameState)
        {
            gameState = false;
            $('#counter').css('color', 'white'); //initialising block
            setTimeout(function()
            {
                $('#counter').css('color', '#939393');
                $('#start').html('RESET');
                pcMove();
            }, 500);
        }
        else
        { //reset game
            location.reload(true);
        }
    });
    $(document).on('click', '.colours', function()
    { //in game block
        if (!gameState)
        { //don't do anything if game hasn't started
            var userMove = $(event.target)[0].id;
            userMoves.push(userMove); //store user move in array
            playSound(userMove);
            if (userMoves.length === pcMoves.length && userMoves.length === 20)
            {
                $('.description').html('Well done! You have the memory of an elephant.');
            }
            else if (userMoves.length === pcMoves.length && userMoves.length < 20)
            {
                if (!checkCorrectMoves())
                {
                    setTimeout(function()
                    {
                        $('#counter').css('color', 'white');
                        $('#counter').html('- -');
                        $('.description').html('Try again.');
                        $('#counter').css('color', '#DC143C');
                        if (strict)
                        {
                            location.reload(true);
                        }
                        else
                        {
                            userMoves = []; //remove incorrect move
                            pcMovesReplay();
                        }
                    }, 500);
                }
                else
                {
                    $('.description').html('Good job.');
                    userMoves = []; //reset user moves each turn, ie. must get sequence correct, not just last colour
                    pcMove();
                }
            }
        }
    });
    var pcMove = function()
    {
        var random = colourArr[Math.floor(Math.random() * colourArr.length)]; //pc chooses random colour
        pcMoves.push(random); //add to array storage of pc moves
        counter++;
        animate(pcMoves);
    };
    var pcMovesReplay = function()
    {
        setTimeout(function()
        {
            animate(pcMoves);
        }, 500);
    }
    var setCounter = function(input)
    {
        if (input < 10)
        {
            $('#counter').html('0' + input); //set counter
        }
        else
        {
            $('#counter').html(input); //set counter
        }
    };
    var checkCorrectMoves = function()
    {
        var length = pcMoves.length;
        for (var i = 0; i < length; i++)
        {
            if (pcMoves[i] !== userMoves[i])
            {
                return false;
            }
        }
        return true;
    }
    var animate = function(sequence)
    {
        var i = 0;
        var interval = setInterval(function()
        {
            lightUp(sequence[i]);
            playSound(sequence[i]);
            setCounter(i + 1);
            $('#counter').css('color', '#939393');
            i++;
            if (i >= sequence.length)
            {
                clearInterval(interval);
            }
        }, 750);
    }
    var lightUp = function(colour)
    {
        var $colour = $('#' + colour).addClass('animate');
        window.setTimeout(function()
        {
            $colour.removeClass('animate');
        }, 500);
    }
    var playSound = function(id)
    {
        if (id === 'green')
        {
            $.playSound('https://s3.amazonaws.com/freecodecamp/simonSound1');
        }
        else if (id === 'red')
        {
            $.playSound('https://s3.amazonaws.com/freecodecamp/simonSound2');
        }
        else if (id === 'yellow')
        {
            $.playSound('https://s3.amazonaws.com/freecodecamp/simonSound3');
        }
        else if (id === 'blue')
        {
            $.playSound('https://s3.amazonaws.com/freecodecamp/simonSound4');
        }
    }
});