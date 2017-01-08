var Campers = React.createClass({
  render: function() {
    return (
      <tbody>
        {this.props.campers.map(function(person, index) {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{person.username}</td>
              <td>{person.recent}</td>
              <td>{person.alltime}</td>
            </tr>
          )
        })
      }
      </tbody>
    )
  }
});

var Leaderboard = React.createClass({
  propTypes: {
    url: React.PropTypes.string.isRequired,
  },
  getDefaultProps: function() {
    return {
      recent: "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
      total: "https://fcctop100.herokuapp.com/api/fccusers/top/alltime",
      data: []
    }
  },
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  componentWillMount: function () {
      $.get(this.props.recent, function (data) {
        this.setState({data: data});
      }.bind(this));
  },
  showRecent: function() {
      $.get(this.props.recent, function (data) {
        this.setState({data: data});
      }.bind(this));  
  },
  showTotal: function() {
      $.get(this.props.total, function (data) {
        this.setState({data: data});
      }.bind(this));
  },
  render: function() {
    return (
      <div class="content">
        <h1 className="center">Free Code Camp Leaderboard</h1>
        <div className="table-responsive">
          <table className="table table-bordered table-responsive">
            <thead>
              <tr>
                <th>#</th>
                <th>Camper Name</th>
                <th><a onClick={this.showRecent}>Points (30 days)</a></th>
                <th><a onClick={this.showTotal}>Points (Total)</a></th>
              </tr>
            </thead>
            <Campers campers={this.state.data} />
          </table>
        </div>
      </div>
    );
  }
});
      
ReactDOM.render(<Leaderboard />, document.getElementById('app'));