import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Search from './screen/Search/Search'
import Loading from './screen/Loading/Loading'
import { Result } from './screen/Result/Result'
import NotFoundPage from './screen/NotFound/NotFound'

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Search />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/loading" element={<Loading />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
