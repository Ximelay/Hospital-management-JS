import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PatientRegistrationPage from "./pages/PatientRegistrationPage";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/register-patient" element={<PatientRegistrationPage />} />
                    {/* Другие маршруты можно добавить здесь */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
