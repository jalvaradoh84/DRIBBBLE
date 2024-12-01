import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home';
import ProjectDetails from './components/ProjectDetails'; // Import the new component

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} /> {/* Default route */}
          <Route path="/project/:id" element={<ProjectDetails />} /> {/* New route for project details */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
