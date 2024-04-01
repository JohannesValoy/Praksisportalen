import React from "react";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="input-error" style={{ color: "red" }}>
      {message}
    </div>
  );
};

export default ErrorMessage;
