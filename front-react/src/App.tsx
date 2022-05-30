import { Category } from "./pages/Category/Category"
import { Home } from "./pages/Home/Home"
import './styles/global.scss'

import { BrowserRouter, Route, Routes, } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/category" element={<Category />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
