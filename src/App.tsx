import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import { NavComponent } from "./components/nav";
import Analytics from "./pages/Analytics";
import Loading from "./pages/Loading";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <NavComponent />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/*" element={<Loading />} />
            </Routes>
        </BrowserRouter>

    );
};

export default App;
