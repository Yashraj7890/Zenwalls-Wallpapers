import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Main from "../components/Main"
import Profile from "../components/Profile"
import { AuthProvider } from './AuthContext';

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default AppRouter;