import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import Cart from './Components/Cart';
function App() {

  const [state, setState] = useState({
    data: {},
    errorMessage: '',
  });
  
  useEffect(() => {
    function getData() {
      axios.get(`http://my-json-server.typicode.com/habilelabs/fake-products/products`)
        .then(res => {
          console.log("res", res);
          setState((prevValue) => {
            return {
              ...prevValue,
              data: res.data
            }
          })
          console.log("Hello", state);

        })
        .catch(error => {
          setState((prevValue) => {
            return {
              ...prevValue,
              errorMessage: error.message
            }
          })
          console.error('There was an error !', error);
        });
    }
    getData();
  }, []);

  
  if (Object.keys(state.data).length === 0) {
    return (
      <h1>OOPS, something went wrong</h1>
    )
  }

  return (
    <div className="App">
      <Cart data={state.data} />      
    </div>
  );
}

export default App;
