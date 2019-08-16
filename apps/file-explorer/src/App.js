import React, {Component} from 'react';
import './App.css';
const fs = window.require('fs');
const path = window.require('path');

class App extends Component{

  state = {
    elements:[]
  }


  getElements = (dir) => {
    let files = fs.readdirSync(dir);
    const elements = files.map(e => {
      let element = {};
      element.name = path.join(dir, e);
        element.folder = fs.statSync(element.name).isDirectory();
       //this.setState(state => ({elements: [...state.elements,element]}));
      return element;
    });
    return elements;
  };
  
  render(){
    const elements = this.getElements("/home/dunja/Desktop/eos");
    console.log(elements);
  return (
    <div className="App">
      <Elements elements = {elements}/>
    </div>
  )};
}

const Elements = ({elements}) => {
  return elements.map(element => {
    return(
        <Element key={element} element = {element}/>
    );
  });
 
} 

const Element = ({element}) => {
  return(
    <div>
      {element.name}
    </div>
  );
}

export default App;
