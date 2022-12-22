import logo from './logo.svg';
import './App.css';


function App() {
  const handclick = () => {
    alert("handclick");
  };
  return (
    <div className="App">
      <h1>Salut Orange</h1>
      <button onClick={handclick()}>Implémenter</button>
    </div>
  );
}

export default App;
