// Standard response format:
// Consumers can check if the request succeeded via the `success` field.
// Errors will always contain a message and sometimes more detailed error information in the `errors` field.

export function successResponse(data?: {} | []) {
  if (Array.isArray(data)) {
    return { success: true, data: data };
  }
  return { success: true, data: { ...data } };
}

export function errorResponse(message: string, errors?: {} | []) {
  if (!errors) {
    return { success: false, message: message };
  }
  if (Array.isArray(errors)) {
    return { success: false, message: message, data: errors };
  }
  return { success: false, message: message, errors: { ...errors } };
}
