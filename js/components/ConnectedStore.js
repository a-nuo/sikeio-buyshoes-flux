import React from "react";
import   CartStore  from "../stores/CartStore";
class ConnectedStore extends React.Component {
  componentDidMount(){
    this.props.store.addChangeListener(this.forceUpdate.bind(this));
  }

  render() {
    // The `children` property is a function.
    let contentRenderFunctions = this.props.children;
    // 1. Read all the data from store by calling reader methods dynamically.
    let store = this.props.store;
    let propNames = this.props.propNames;
    let storeProps ={};
    /*for(let propName in propNames){
      storeProps[propNames[propName]]=store[propNames[propName]]();
    }*/
    
    propNames.map(function(value,index){
      storeProps[value]=store[value]();
      
    });
    
    // 2. Pass the data to `contentRenderFunction`.
    
    //...

    return contentRenderFunctions(storeProps);
  }
}

module.exports= ConnectedStore;