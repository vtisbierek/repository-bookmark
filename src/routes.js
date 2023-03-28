import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import Repository from "./pages/Repository";
import Error from "./pages/Error";

export default function MyRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/repo/:repoName" element={<Repository />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}