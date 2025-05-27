import ReactDOM from "react-dom/client";  // render for web browswers
import React from 'react';                // react core library
import { BrowserRouter, Routes, Route } from "react-router-dom";  // React router
import Layout from "./pages/Layout";
import Categorize from "./pages/Categorize";
import Clean from "./pages/Clean";
import Complete from "./pages/Complete";
import Declutter from "./pages/Declutter";
import Empty from "./pages/Empty";
import Menu from "./pages/Menu";
import Return from "./pages/Return";
import Zone from "./pages/Zone"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="app" element={<AppPage />} />
        <Route path="categorize" element={<Categorize />} />
        <Route path="clean" element={<Clean />} />
        <Route path="complete" element={<Complete />} />
        <Route path="declutter" element={<Declutter />} />
        <Route path="empty" element={<Empty />} />
        <Route path="menu" element={<Menu />} />
        <Route path="return" element={<Return />} />
        <Route path="zone" element={<Zone />} />
        <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


