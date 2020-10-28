import './App.css';
import {Switch, Route} from 'react-router-dom';
import Navbar from './components/NetworkError';
import User from './components/User';
import Repositories from './components/Repositories';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={User}/>
        <Route exact path="/:user" component={User}/>
        <Route exact path="/:user/repositories" component={Repositories}/>
      </Switch>
    </div>
  );
}

export default App;
