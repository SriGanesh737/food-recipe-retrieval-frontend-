import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'
import RecipePage from './components/RecipePage.jsx'
import { SearchResultsProvider } from './SearchResultsContext';
import PrCurvePage from './components/PrCurvePage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SearchResultsProvider>
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/recipes/:id" element={<RecipePage />} />
      <Route path="/pr-curve" element={<PrCurvePage />} />
    </Routes>
  </Router>
  </SearchResultsProvider>
)
