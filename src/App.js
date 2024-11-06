import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/prelogin/homepage/homepage';
import Forgotpassword from './component/prelogin/forgotpassword/Forgotpassword';
import Dashboard from './component/postlogin/dashboard/dashboard';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgotPassword" element={<Forgotpassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
