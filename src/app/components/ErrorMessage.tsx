import React from "react";

/**
 * The ErrorMessageProps interface represents the props of the ErrorMessage component.
 */
type ErrorMessageProps = {
  message: string;
};

/**
 * The ErrorMessage component displays an error message.
 * @param message The error message.
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="input-error" style={{ color: "red" }}>
      {message}
    </div>
  );
};

export default ErrorMessage;
