// Component to take track of validation errors
// Possible inputs [] or string

const ValidationErrors = ({ errors }) => {
  // If I get an array
  // Loop over list and display errors
  // Otherwise, display message
  const errorList = Array.isArray(errors) ? (
    errors.map((error, i) => <li key={i}>{error}</li>)
  ) : (
    <p>{errors}</p>
  );

  return (
    <div className="wrap">
      <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>{errorList}</ul>
      </div>
    </div>
  );
};

export default ValidationErrors;
