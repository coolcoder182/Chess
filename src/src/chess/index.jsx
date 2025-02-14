import React from "react";
import { createRoot } from "react-dom/client"
import { ChessApp } from "./app/ChessApp";

function render({ mount, App = ChessApp }) {
    const root = createRoot(mount);
    root.render(
        <App/>
    );
}

export function renderChess({ mount, App = ChessApp }) {
    render({ mount, App });
}