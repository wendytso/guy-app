import logo from './assets/guy-logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="guy-logo" alt="logo" />
        <p>
          the guy app
        </p>
      </header>
    </div>
  );
}

export default App;
