import {Dispatcher} from "flux";
let dispatcher = new Dispatcher();

let tokenC = dispatcher.register((action) => {
  dispatcher.waitFor([tokenB]);
  console.log("C", action);
});

let tokenA = dispatcher.register((action) => {
  console.log("A", action);
});

let tokenB = dispatcher.register((action) => {
  dispatcher.waitFor([tokenA]);
  console.log("B", action);
});



dispatcher.dispatch({type: "test"});