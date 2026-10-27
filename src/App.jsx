import Home from "./pages/Home"
import Favorites from "./pages/Favorites.jsx"
import Navbar from "./components/common/Navbar.jsx"
import { MovieProvider } from "./context/MovieContext.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"


export default function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  )
}
