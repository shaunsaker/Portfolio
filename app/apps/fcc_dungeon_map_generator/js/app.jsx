var Cell = React.createClass({
  getClasses: function() {
    var classes = "";
      switch(this.props.value) {
        case 0:
          classes = "player";
          break;
        case 1:
          classes = "enemy";
          break;
        case 2:
          classes = "health";
          break;
        case 3:
          classes = "weapon";
          break;
        case 4:
          classes = "boss";
          break;
        case 5:
          classes = "wall";
          break;
        default:
          classes = "empty";
      }
      return classes;
  },
  render: function() {
    return (
      <div className={"cell " + this.getClasses()} onClick={this.props.onChangeCell} x={this.props.x} y={this.props.y}></div>
    )
  }
});

var Canvas = React.createClass({
  width: 50, // depends on design
  height: 25, // depends on design
  cursor: 0,
  getInitialState: function() {
    return {
      cells: JSON.parse(localStorage.getItem('cells')) || this.generateMap()
    }
  },
  generateCells: function(row, rowIndex) {
    var square = this;
    return (
      row.map(function(val, colIndex){
        return (
          <Cell x={rowIndex} y={colIndex} value={val.value} onChangeCell={square.changeCell}/>
        )
      })
    )
  },
  generateMap: function() {
      var current = new Array(this.height);
      for (var i = 0; i < this.height; i++) {
          current[i] = new Array(this.width);
          for (var j = 0; j < this.width; j++) {
            current[i][j] = {
             value: 6
            }; // start with a board of "ground"
          }
      }
      return current;
  },
  updateSize: function(e) {
    var id = e.target.id;
    if (id === 'width') {
      this.width = e.target.value;
    }
    else {
      this.height = e.target.value;
    }
  },
  changeSize: function(e) {
    this.setState({cells:this.generateMap()});
    var width = this.width * 15 + "px"; // 10 x 10 cells
    $('.canvas').css( "width", width);
  },
  handleCursorChange: function(e) {
    var id = e.target.id;
    this.cursor = parseInt(id);
  },
  changeCell: function(e) {
    var current = this.state.cells;
    var x = e.target.getAttribute("x");
    var y = e.target.getAttribute("y");
    current[x][y].value = this.cursor;
    this.setState({cells: current});
  },
  save: function() {
    console.log(JSON.stringify(this.state.cells));
    localStorage.setItem('cells', JSON.stringify(this.state.cells));
  },
  componentDidMount: function() {
    var width = this.width * 15 + "px";
    $('.canvas').css( "width", width);
  },
  render: function() {
    return (
      <div className="container">
        <div className="intro text-center">
          <h1>Dungeon Crawler Map Generator</h1>
          <p>Generate a dungeon for your React FCC Dungeon Crawler challenge. Paint the board by clicking on the icons below. When you're finished, click save and pull into your app in getInitialState with cells: JSON.parse(localStorage.getItem('cells')). *This is also available as a string in the console when saving. You can hardcode this into your app and call JSON.parse on it.</p>
          <form className="form-inline">
            <div className="form-group">
              <label>Width: </label>
              <input type="text"id="width" placeholder={this.width} aria-describedby="width-addon" onChange={this.updateSize}></input>
              <label>Height: </label>
              <input type="text" id="height" placeholder={this.height} aria-describedby="height-addon" onChange={this.updateSize}></input>
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-default" onClick={this.changeSize}>Generate</button>
              <button type="button" className="btn btn-default" onClick={this.save}>Save</button>
            </div>
          </form>
          <ul>
            <li><div className="legend player" id="0" onClick={this.handleCursorChange}></div><p>Player (0)</p></li>
            <li><div className="legend enemy" id="1" onClick={this.handleCursorChange}></div><p>Enemy (1)</p></li>
            <li><div className="legend health" id="2" onClick={this.handleCursorChange}></div><p>Health (2)</p></li>
            <li><div className="legend weapon" id="3" onClick={this.handleCursorChange}></div><p>Weapon (3)</p></li>
            <li><div className="legend boss" id="4" onClick={this.handleCursorChange}></div><p>Boss (4)</p></li>
            <li><div className="legend wall" id="5" onClick={this.handleCursorChange}></div><p>Wall (5)</p></li>
            <li><div className="legend empty" id="6" onClick={this.handleCursorChange}></div><p>Empty (6)</p></li>
          </ul>
        </div>
        <div className="canvas">
          {this.state.cells.map(this.generateCells)}
        </div>
      </div>
    )
  }
});

ReactDOM.render(<Canvas />, document.getElementById('app'));