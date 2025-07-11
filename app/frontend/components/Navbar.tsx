import React from "react";
import { useUser } from "../contexts/UserContext";

const Navbar: React.FC = () => {
    const { name, points } = useUser()
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
            <div className="container">
                <a className="navbar-brand fw-bold text-primary" href="/">
                    Rewards Redemption
                </a>
                <div className="d-flex align-items-center ms-auto">
                    <span className="me-3 text-muted">
                        <strong>{name}</strong>
                    </span>
                    <span className="badge badge-soft-green px-3 py-2">
                        {points} pts
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
