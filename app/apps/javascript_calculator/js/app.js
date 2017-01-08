  var txtArr = []; //array to capture input
  var calc = 0;
  $(document).on('click', '.input li', function(event)
  {
      event = event || window.event; //fix for IE9-
      var target = event.target || event.srcElement; //fix for IE9-
      var txt = $(target).text();
      if (txt !== 'CE' && txt !== 'AC' && txt !== '=')
      { //push all other values to array
          txtArr.push(txt);
          $('.window').html(txtArr.join("")); //print to window
      }
  });
  $(document).on('click', '#backspace', function()
  { //backspace block
      txtArr.pop();
      $('.window').html(txtArr.join(""));
  });
  $(document).on('click', '#reset', function()
  { //reset block
      txtArr = [];
      $('.window').html(txtArr.join(""));
  });
  $(document).on('click', '#equals', function()
  { //calculation block
      calc = eval(txtArr.join(""));
      $('.window').html(calc);
  });