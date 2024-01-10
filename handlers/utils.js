class Utils {
  static serializeMessage(status, data) {
    return { status: status, data: data };
  }

  static TrimUnnecessaryDataForResponseData(data) {
    delete data.tools;
    delete data.file_ids;
    delete data.metadata;
  }

  static fromArrayToObjectWithTrimmingData(data) {
    data.data.forEach(v => Utils.TrimUnnecessaryDataForResponseData(v));
    data.data = { ...data.data };
  }
}

module.exports = {
  Utils
};
