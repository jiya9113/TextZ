import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './routes/login/login';
import Register from './routes/register/register';
import Home from './routes/home/home';
import Start from './components/start';

const App = () => {
  return (
    <div className="bg-[#F8F4EA]">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/chats" element={<Home />} />
          <Route exact path="/" element={<Start />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;