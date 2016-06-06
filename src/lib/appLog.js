import config from '../config.js';

export default (
  config.debug ?
  {
    info: (...args) => global.console.log(...args),
    error: (...args) => global.console.log(...args)
  } :
  {
    info: ()=>{},
    error: ()=>{}
  }
);
