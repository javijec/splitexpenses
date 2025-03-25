/**
 * Centralized error handler for the application
 * @param {Error} error - The error object
 * @param {string} context - The context where the error occurred
 * @param {boolean} shouldThrow - Whether to throw the error after handling
 * @returns {Object} Error information object
 */
export const handleError = (error, context = "application", shouldThrow = false) => {
  // Log the error
  console.error(`Error in ${context}:`, error);
  
  // You could add analytics or error reporting here
  
  // Create an error info object
  const errorInfo = {
    success: false,
    message: error.message || "An unknown error occurred",
    code: error.code || "UNKNOWN_ERROR",
    context
  };
  
  // Optionally rethrow the error
  if (shouldThrow) {
    throw error;
  }
  
  return errorInfo;
};

/**
 * Wraps an async function with error handling
 * @param {Function} fn - The async function to wrap
 * @param {string} context - The context for error handling
 * @returns {Function} Wrapped function with error handling
 */
export const withErrorHandling = (fn, context) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      return handleError(error, context);
    }
  };
};