import { useEffect, useState } from 'react';
import { 
  Switch,
  Route,
} from "react-router-dom";

import TopBar from './components/TopBar/TopBar';
import Sidebar from './components/Sidebar/Sidebar';



import './App.scss';
import Clientes from './components/Clientes/Clientes';

function App() {
  const [data, setData] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    
    fetch("http://localhost:8080")
    .then(res => res.json())
    .then(({msg}) =>setData(msg))
    .catch(console.log)
    .finally(setReady(true));


  },[]);

  return (
    <div className="App">
        <TopBar/>
        <div className="container">
          <Sidebar className="sidebar"/>
          <div className="others">            
            <Switch>
              <Route path="/clientes">
                <Clientes/>
              </Route>
            </Switch>
          </div>
        </div>
        {ready ?
        (<div>
          <h1>Hola que tal,sorrasos</h1>
          <h2>{data}</h2>
        </div>)
        :(
          <div>Loading...</div>
        )
        }
        
      </div>

  );
}

export default App;
