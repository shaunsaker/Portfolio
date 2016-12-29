var MarkdownPreviewer = React.createClass({
  getInitialState: function() {
    return {
      userInput: 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*'
    }
  },
  handleUserInput: function (e) {
    this.setState({
      userInput: e.target.value,
    });
  },
  convertMarkdown: function (value) {
    return {__html: marked(value)};
  },
  render: function () {
    return (
      <div className = "row">
        <div className = "col-md-6">
          <h1>Insert Markdown Here</h1>
          <textarea className = "textarea" onChange = {this.handleUserInput} value = {this.state.userInput}/>
        </div>
        <Output value = {this.convertMarkdown(this.state.userInput)}/>
      </div>
    )
  }
});

var Output = React.createClass({
  render: function () {
    return (
      <div className = "col-md-6">
        <h1>Output HTML</h1>
        <div className = "textarea output" dangerouslySetInnerHTML={this.props.value}></div>
      </div>
    )
  }
});

ReactDOM.render(<MarkdownPreviewer />, document.getElementById("app"));