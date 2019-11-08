// file: src/qnd-react.js
import { h } from 'snabbdom';

const createElement = (type, props = {}, ...children) => {
  // flatten the children
  // this to make todos.map(todo => <p>{todo}</p>) work in jsx
  // [['idly'], ['dosa', 'vada']] -> ['idly', 'dosa', 'vada']
  children = children.flat();

  // if type is a Class then
  // 1. create a instance of the Class
  // 2. call the render method on the Class instance
  if (type.prototype && type.prototype.isQndReactClassComponent) {
    const componentInstance = new type(props);

    // remember the current vNode instance
    componentInstance.__vNode = componentInstance.render();

    // add hook to snabbdom virtual node to know whether it was added to the actual DOM
    componentInstance.__vNode.data.hook = {
      create: () => {
        componentInstance.componentDidMount()
      }
    }

    return componentInstance.__vNode;
  }
  // if type is a function then call it and return it's value
  if (typeof (type) == 'function') {
    return type(props);
  }

  props = props || {};
  let dataProps = {};
  let eventProps = {};

  // This is to seperate out the text attributes and event listener attributes
  for(let propKey in props) {
    // event props always startwith on eg. onClick, onChange etc.
    if (propKey.startsWith('on')) {
      // onClick -> click
      const event = propKey.substring(2).toLowerCase();

      eventProps[event] = props[propKey];
    }
    else {
      dataProps[propKey] = props[propKey];
    }
  }

  // props -> snabbdom's internal text attributes
  // on -> snabbdom's internal event listeners attributes
  return h(type, { props: dataProps, on: eventProps }, children);
};

// component base class
class Component {
  constructor() { }

  componentDidMount() { }

  setState(partialState) {
    // update the state by adding the partial state
    this.state = {
      ...this.state,
      ...partialState
    }
    // call the __updater function that QndReactDom gave
    QndReact.__updater(this);
  }

  render() { }
}

// add a static property to differentiate between a class and a function
Component.prototype.isQndReactClassComponent = true;

// to be exported like React.createElement, React.Component
const QndReact = {
  createElement,
  Component
};

export default QndReact;
