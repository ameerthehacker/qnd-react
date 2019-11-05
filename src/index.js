// file: src/index.js
// QndReact needs to be in scope for JSX to work
import QndReact from "./qnd-react";
import QndReactDom from "./qnd-react-dom";
import Counter from "./counter";

// functional component to welcome someone
const Greeting = ({ name }) => <p>Welcome {name}!</p>;
const foods = [
  'idly',
  'dosa',
  'vada'
]

const App = (
  <div>
    <h1 className="primary">
      QndReact is Quick and dirty react
    </h1>
    <p>It is about building your own React in 90 lines of JavsScript</p>
    <Greeting name={"Ameer Jhan"} />
    <Counter />
    <h4>The following renders a list of food</h4>
    <ul>
      {foods.map(food => <li>{food}</li>)}
    </ul>
  </div>
);

QndReactDom.render(App, document.getElementById("root"));