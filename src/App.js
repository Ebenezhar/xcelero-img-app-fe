import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import UploadPage from "./pages/UploadPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="" element={<Home />} />
          <Route path="viewinfo/:fname" element={<InfoPage />} />
          <Route path="editinfo/:fname" element={<EditPage />} />
          <Route path="upload" element={<UploadPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
