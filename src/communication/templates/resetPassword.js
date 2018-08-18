export default data => `Password was just reset for the user with email "${data.email}". Your token for creating new password is "${data.token}"`;
