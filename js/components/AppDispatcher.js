
import EventEmitter from "events";
//flux 替换 自制 Dispatcher
import {Dispatcher} from "flux";
const EVENT_NAME = "action";


let dispatcher = new Dispatcher();

module.exports = dispatcher;