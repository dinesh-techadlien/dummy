import './App.css';
import { Routes, Route} from 'react-router-dom';
import Verification from './components/verification';
import Signup from './components/main'
function App() {
  return (
    <div className="app">
        <Routes> 
      <Route path="/" exact element={<Signup />} />
      <Route path="/verify-mobile" exact element={<Verification />} />
    
  </Routes>
  </div>
  );
}

export default App;
