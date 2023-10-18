import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './pages/Products';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main className='main'>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Products />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        autoClose={3000}
        theme=''
        hideProgressBar={true}
      />
    </main>
  );
}

export default App;
