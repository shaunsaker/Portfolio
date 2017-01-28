var Cell = React.createClass({
  alive: {
    'background-color': 'red'
  },
  dead: {
    'background-color': 'black'
  },
  render: function() {
    return (
      <div style={this.props.value === 1 ? this.alive : this.dead } x={this.props.x} y={this.props.y}></div>
    )
  }
});

var Game = React.createClass({
  width: 30,
  height: 30,
  interval: '',
  speed: 500,
  neighbors: [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ],
  nextGeneration: [],
  getInitialState: function() {
    return {
      cells: this.createBoard(),
      generations: 0
    };
  },
  gameRun: function() {
    this.interval = setInterval(this.gameStart, this.speed);
  },
  gameStart: function() {
    this.nextGeneration = this.getNextGeneration();
    this.setState({ generations: this.state.generations + 1 });
    this.setState({ cells: this.nextGeneration })
  },
  gamePause: function() {
     clearInterval(this.interval);
  },
  gameClear: function() {
    clearInterval(this.interval);
    this.setState({ generations: 0 });
    this.setState({ cells: this.state.cells.map(function(row){
      return row.map(function(column){
        return 0
      })
    })});
  },
  gameReset: function() {
    clearInterval(this.interval);
    this.setState({ generations: 0 });
    this.setState({ cells: this.createBoard() });
    this.gameRun();
  },
  changeSize: function(e) {
    this.setState({ generations: 0 });
    clearInterval(this.interval)
    switch(e.target.innerHTML) {
      case '25 x 25':
        this.width = 25;
        this.height = 25;
        break;
      case '50 x 25':
        this.width = 50;
        this.height = 25;
        break;
      default:
        this.width = 30;
        this.height = 25;
    }
    this.setState({ cells: this.createBoard() });
    var width = this.width * 15 + "px"
    $('.board').css( "width", width)
    this.gameRun();
  },
  changeSpeed: function(e){
    clearInterval (this.interval)
    switch (e.target.innerHTML) {
      case 'Slow':
          this.speed = 1000
          break;
      case 'Fast':
          this.speed = 100
          break;
      default:
          this.speed = 500
    }
    this.gameRun();
  },
  createBoard: function() {
    var current = new Array(this.height);
    for (var i = 0; i < this.height; i++) {
        current[i] = new Array(this.width);
        for (var j = 0; j < this.width; j++) {
            current[i][j] = Math.random() < 0.5 ? 1 : 0;
        }
    }
    return current;
  },
  createSquares: function(row, rowIndex) {
    return (
      row.map(function(val, colIndex){
        return (
          <Cell x={rowIndex} y={colIndex} value={val}/>
        )
      })
    )
  },
  getNextGeneration: function() {
    return this.getNeighbours().map(function(row, x){
      return row.map(function(column, y){
        return (this.state.cells[x][y] === 1 && column === 2 || column === 3 ? 1 : 0)
      }, this)
    }, this)
  },
  getNeighbours: function() {
    var squares = this;
    return (squares.state.cells.map(function(row, rowIndex){
      return (
        row.map(function(column, colIndex){
          return (
            squares.neighbors.map(function(position){
              var x = position[0] + rowIndex;
              var y = position[1] + colIndex;
              if ( x === -1) {
                x = squares.height - 1;
              }
              else if (x === squares.height) {
                x = 0;
              }
              if (y === -1) {
                y = squares.width - 1;
              }
              else if (y === squares.width) {
                y = 0;
              }
              return (squares.state.cells[x][y])
            })
            .reduce(function(previousVal, currentVal){
              return previousVal + currentVal
            }))
        }, squares))
    }, squares))
  },
  componentDidMount: function() {
    var width = this.width * 15 + "px"
    $('.board').css( "width", width)
    this.gameRun();
  },
  render: function() {
    return (
      <div>
        <h1>Conway's Game of Life</h1>
        <p>Generation: {this.state.generations}</p>
        <div className="text-center">
          <button type="button" className="btn btn-default" onClick={this.gameRun}>Start</button>
          <button type="button" className="btn btn-default" onClick={this.gameReset}>Reset</button>
          <button type="button" className="btn btn-default" onClick={this.gamePause}>Pause</button>
          <button type="button" className="btn btn-default" onClick={this.gameClear}>Clear</button>
        </div>
        <div className="text-center">
          <button type="button" className="btn btn-default" onClick={this.changeSize}>25 x 25</button>
          <button type="button" className="btn btn-default" onClick={this.changeSize}>30 x 25</button>
          <button type="button" className="btn btn-default" onClick={this.changeSize}>50 x 25</button>
        </div>
        <div className="text-center">
          <button type="button" className="btn btn-default" onClick={this.changeSpeed}>Slow</button>
          <button type="button" className="btn btn-default" onClick={this.changeSpeed}>Medium</button>
          <button type="button" className="btn btn-default" onClick={this.changeSpeed}>Fast</button>
        </div>  
        <div className='board'>
          {this.state.cells.map(this.createSquares)}
        </div>
      </div>
    )
  }
});

ReactDOM.render(<Game />, document.getElementById('app'));