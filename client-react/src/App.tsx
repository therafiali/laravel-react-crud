import { Route, Routes } from "react-router-dom";
import Post from "./components/Post";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/post" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
