import './App.css'; 
import ButtonsNav from './components/ButtonsNav/ButtonsNav';
import Header from './components/Header/Header'

function App() {
  return (
    <div>
      <Header/>
      <ButtonsNav/>
      <div className='content-box'>
        <h1>Teste</h1>
      </div>
    </div>
  );
}

export default App;
