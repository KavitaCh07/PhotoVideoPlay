import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/home';
import ViewPhoto from './components/ViewPhoto/viewPhoto';
import PlayVideo from './components/playVideo/playVideo';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/viewPhoto' element={<ViewPhoto/>}/>
     <Route path='/playVideo' element={<PlayVideo/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
