import React from "react";
import { LoaderErrorProps } from "../types/Type"

const LoaderError: React.FC<LoaderErrorProps> = ({
  loading,
  error,
  children,
  loadingMessage = "Loading ...",
  errorMessage = "Error loading!",
  customClass = "",
}) => {
  if (loading) {
    return (
      <div data-testid="loading" className={`flex justify-center items-center text-xl text-blue-500 ${customClass}`}>
        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16 mr-2"></div>
        {loadingMessage}
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="error" className={`bg-red-100 text-red-700 p-4 rounded-md border border-red-400 ${customClass}`}>
        <strong>
            {errorMessage}
        </strong>
        : {error}
      </div>
    );
  }

  return <div data-testid="children">{children}</div>;
};

export default LoaderError;