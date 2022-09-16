import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ListPage, DetailsPage, AddDataPage, PageNotFound } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/addRecord" element={<AddDataPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
