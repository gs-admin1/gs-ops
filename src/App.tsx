import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HowDidYouHear from "./HowDidYouHear";
import SupportSidebar from "./components/SupportSidebar";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the "How Did You Hear About Us" page */}
        <Route path="/" element={<HowDidYouHear />} />
        {/* Route for the "Support Sidebar" page */}
        <Route path="/support" element={<SupportSidebar />} />
      </Routes>
    </Router>
  );
}

export default App;
