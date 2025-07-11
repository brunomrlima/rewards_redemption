import React from "react";
import { createRoot } from "react-dom/client";
import "../styles/application.scss"

const App = () => (
    <div className="container mt-5">
        <h1 className="text-primary mb-4">Rewards Redemption App</h1>

        <div className="card shadow">
            <div className="card-body">
                <h5 className="card-title">Welcome!</h5>
                <p className="card-text">
                    This is your starting point for the rewards redemption interface.
                </p>
                <button className="btn btn-success">Redeem a Reward</button>
            </div>
        </div>
    </div>
);

const rootElement = document.getElementById("root");
if (rootElement) createRoot(rootElement).render(<App />);
