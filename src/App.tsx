import React from "react";
import "./App.scss";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import MovieCreate from "./components/MovieCreate";
import MovieEdit from "./components/MovieEdit";
import Movies from "./components/Movies";
import { store } from "./store/store";
import { Provider } from "react-redux";

const App = () => {
    return (
        <Provider store={store}>
            <Router basename="/">
                <Routes>
                    <Route path="/" element={<Navigate to="movies" />} />
                    <Route path="movies" element={<MainLayout />}>
                        <Route path="edit/:id" element={<MovieEdit />} />
                        <Route path="create" element={<MovieCreate />} />
                        <Route index element={<Movies />} />
                    </Route>
                    <Route path="*" element={<>404 Not found!</>} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;