class Utils {
  static serializeMessage(status, data) {
    return { status: status, data: data };
  }

  static TrimUnnecessaryDataForResponseData(data) {
    delete data.tools;
    delete data.file_ids;
    // FIXME(minsu): metadata is necessary to show. but need to discuss how to cope with {}.
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
