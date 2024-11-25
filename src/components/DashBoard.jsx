import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Get user info from localStorage or sessionStorage
        const userEmail =  sessionStorage.getItem("email");

        if (!userEmail) {
            // If no user is logged in, redirect to login page
            navigate("/login");
            return;
        }

        // Extract username from email (remove everything after @)
        const name = userEmail.split("@")[0];
        // Capitalize first letter
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
        setUsername(formattedName);
    }, [navigate]);

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-primary mb-4">Dashboard</h2>
                            {username ? (
                                <div>
                                    <h3 className="welcome-text">
                                        Welcome back, <span className="text-primary">{username}</span>! 👋
                                    </h3>
                                    <p className="text-muted mt-2">
                                        You're successfully logged into your dashboard.
                                    </p>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* You can add more dashboard content here */}
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Quick Stats</h5>
                            <p className="card-text">View your activity and statistics here.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Recent Activity</h5>
                            <p className="card-text">Check your recent actions and updates.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Notifications</h5>
                            <p className="card-text">Stay updated with the latest notifications.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;