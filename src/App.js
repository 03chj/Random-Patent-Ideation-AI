import './App.css';
import { Result } from './screen/Result/Result'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Result/>}/>
        <Route path='/search' element={<Result/>}/>
      </Routes>
    </Router>
  );
}

export default App;
