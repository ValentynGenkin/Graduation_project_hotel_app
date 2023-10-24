// only purpose create an error class with status property.
class ServerError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
export default ServerError;
