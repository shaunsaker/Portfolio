function Button (props) {
  return <button type="button" className={props.className ? "btn btn-default " + props.className : "btn btn-default "} onClick={props.onUserClick} data-toggle={props.toggle} data-modal={props.target} data-dismiss={props.dismiss} id={props.index}>{props.text}</button>
}

function Input (props) {
  return <input type="text" className="form-control" id={props.id} placeholder={props.placeholder} onChange={props.input} value={props.display}></input>
}

function AddRecipe (props) {
  return (
    <div id="myModal" className="modal fade" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <Button className="close" dismiss="modal" onUserClick={props.onUserExit} text="X"/>
            <h4 className="modal-title">{props.editing ? "Edit Recipe" : "Add New Recipe"}</h4>
          </div>
          <div className="modal-body">
            <form id="form">
              <div className="form-group">
                <Input id="newRecipe" placeholder="Enter recipe name" input={props.onUserInput} display={props.formName}/>
              </div>
              <div className="form-group">
                <Input id="newIngredients" placeholder="Enter ingredients separated by a comma" input={props.onUserInput} display={props.formIngredients}/>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <Button text={props.editing ? "Save Recipe" : "Add Recipe"} onUserClick={props.onUserAdd} index={props.id}/>
          </div>
        </div>
      </div>
    </div>
  )
}

var Ingredients = React.createClass({
  getDefaultProps: function() {
    return {
      ingredients: ['Ingredient One', 'Ingredient Two', 'Ingredient Three']
    }
  },
  render: function() {
    return (
      <ul className="list-group">
        {this.props.ingredients.map(function (value) {
            return (
              <li className="list-group-item">{value}</li>
            )
        })}
      </ul>
    )
  }
});

function SingleRecipe (props) {
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h4 className="panel-title">
          <a data-toggle="collapse" href={"#collapse" + props.index}>{props.recipe.name}</a>
        </h4>
      </div>
      <div id={"collapse" + props.index} className="panel-collapse collapse">
        <Ingredients ingredients={props.recipe.ingredients}/>
        <div className="panel-footer">
          <Button text="Edit" onUserClick={props.edit} index={props.index}/>
          <Button text="Delete" onUserClick={props.delete} index={props.index}/>
        </div>
      </div>
    </div>
  )
}

function Recipes (props) {
  return (
    <div className="panel-group">
      {props.recipes.map(function(recipe, index) {
        return (
          <SingleRecipe recipe={recipe} index={index} delete={props.onUserDelete} edit={props.onUserEdit}/>
        )
      })}
    </div>
  )
}

var RecipeBox = React.createClass({
  getInitialState: function() {
    return {      
      recipes: JSON.parse(localStorage.getItem('recipes')) || [{
        name: "Recipe Name",
        ingredients: ['Ingredient One', 'Ingredient Two', 'Ingredient Three']
      }],
      newRecipe: "",
      newIngredients: "",
      editMode: false,
      currentIndex: ""
    }
  },
  handleUserClick: function() {
    $('#myModal').modal('show');
  },
  handleUserAdd: function(e) {
    var newIngredients = this.state.newIngredients.split(",");
    var newRecipe = {
      name: this.state.newRecipe, 
      ingredients: newIngredients
    };
    var recipes = this.state.recipes;
    if (this.state.editMode) {
      var id = e.target.id;
      recipes.splice(id, 1, newRecipe);
    }
    else {
      recipes.push(newRecipe);
    }
    this.setState({
      recipes: recipes,
      newRecipe: "",
      newIngredients: "",
      editMode: false
    });
    localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
    $('#myModal').modal('hide');
  },
  handleUserExit: function() {
    this.setState({
      newRecipe: "",
      newIngredients: "",
      editMode: false
    });
  },
  handleUserDelete: function(e) {
    var recipes = this.state.recipes;
    var id = e.target.id;
    recipes.splice(id, 1);
    this.setState({
      recipes: recipes,
    });
  },
  handleUserEdit: function(e) {
    var id = e.target.id;
    var recipes = this.state.recipes;
    var recipe = recipes[id];
    var name = recipe.name;
    var ingredients = recipe.ingredients.join(", ");
    this.setState({
      newRecipe: name,
      newIngredients: ingredients,
      editMode: true,
      currentIndex: id
    });
    $('#myModal').modal('show');
  },
  handleUserInput: function(event) {
    var key = event.target.id;
    var val = event.target.value;
    var obj  = {};
    obj[key] = val;
    this.setState(obj);
  },
  render: function() {
    return (
      <div>
        <h1>Recipe Box</h1>
        <Recipes recipes={this.state.recipes} onUserDelete={this.handleUserDelete} onUserEdit={this.handleUserEdit}/>
        <Button text="Add New Recipe" onUserClick={this.handleUserClick} toggle="modal" target="#myModal"/>
        <AddRecipe onUserAdd={this.handleUserAdd} onUserInput={this.handleUserInput} onUserExit={this.handleUserExit} formName={this.state.newRecipe} formIngredients={this.state.newIngredients} editing={this.state.editMode} id={this.state.currentIndex}/>
      </div>
    )
  }
});

ReactDOM.render(<RecipeBox />, document.getElementById('app'));