import React from "react";

type Props = {
    message: string;
};

const ErrorMessage: React.FC<Props> = ({ message }) => (
    <div role="alert" className="alert alert-danger text-center my-4">
        <strong>Error:</strong> {message}
    </div>
);

export default ErrorMessage;
