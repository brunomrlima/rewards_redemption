import React from "react";

const Loading: React.FC = () => (
    <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading...</p>
    </div>
);

export default Loading;
