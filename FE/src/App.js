import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './screen/Search/Search';
import Loading from './screen/Loading/Loading';
import { Result } from './screen/Result/Result';
import { Result2 } from './screen/Result/Result2';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/result" element={<Result />} />
          <Route path="/result2" element={<Result2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
