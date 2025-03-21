import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./pages/Header.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NewTask from "./pages/NewTask.tsx";
import OpenTask from "./components/OpenTask.tsx";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col justify-center px-[120px]">
        <Header />
        <div className="pt-[120px]">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/new-task" element={<NewTask />} />
            <Route path="/task/:id" element={<OpenTask />} />
            <Route />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
