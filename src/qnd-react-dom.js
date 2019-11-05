// file: src/qnd-react-dom.js
import * as snabbdom from 'snabbdom';
import propsModule from 'snabbdom/modules/props';
import eventlistenersModule from 'snabbdom/modules/eventlisteners';
import QndReact from './qnd-react';

// propsModule -> this helps in patching text attributes
// eventlistenersModule -> this helps in patching event attributes
const reconcile = snabbdom.init([propsModule, eventlistenersModule]);
// we need to maintain the latest rootVNode returned by render
let rootVNode;

// React.render(<App />, document.getElementById('root'));
// el -> <App />
// rootDomElement -> document.getElementById('root')
const render = (el, rootDomElement) => {
  // logic to put el into the rootDomElement
  // ie. QndReactDom.render(<App />, document.getElementById('root'));
  // happens when we call render for the first time
  if (rootVNode == null) {
    rootVNode = rootDomElement;
  }

  // remember the VNode that reconcile returns
  rootVNode = reconcile(rootVNode, el);
}

// QndReactDom telling React how to update DOM
QndReact.__updater = (componentInstance) => {
  // logic on how to update the DOM when you call this.setState

  // get the oldVNode stored in __vNode
  const oldVNode = componentInstance.__vNode;
  // find the updated DOM node by calling the render method
  const newVNode = componentInstance.render();

  // update the __vNode property with updated __vNode
  componentInstance.__vNode = reconcile(oldVNode, newVNode);
}

// to be exported like ReactDom.render
const QndReactDom = {
  render
};

export default QndReactDom;