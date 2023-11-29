class Utils {
  static serializeMessage(status, data) {
    return { status: status, data: data };
  }
}

module.exports = {
  Utils
};
