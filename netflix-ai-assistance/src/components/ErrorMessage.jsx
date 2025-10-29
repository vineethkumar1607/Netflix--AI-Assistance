import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-100 text-red-700 p-4 rounded border border-red-300 shadow-md">
      <p className="font-medium">Error:</p>
      <p>{message}</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
