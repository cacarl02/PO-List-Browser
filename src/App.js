import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './pages/Products';

function App() {
  return (
    <main className='main'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Products />}></Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
