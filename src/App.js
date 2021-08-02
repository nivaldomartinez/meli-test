import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Search from './pages/Search';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <div className="App">
            <Search />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
