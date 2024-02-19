const _ = require('lodash');

class Utils {
  static serializeMessage(status, data) {
    return { status: status, data: data };
  }

  static TrimEmptyMetadataForResponseData(data) {
    if (data.metadata && _.isEmpty(data.metadata)) {
      delete data.metadata;
    }
  }

  static TrimUnnecessaryDataForResponseData(data) {
    delete data.tools;
    delete data.file_ids;
    delete data.tool_resources;
    Utils.TrimEmptyMetadataForResponseData(data);
  }

  static fromArrayToObjectWithTrimmingData(data) {
    data.data.forEach(v => Utils.TrimUnnecessaryDataForResponseData(v));
    data.data = { ...data.data };
  }

  static fromArrayToObjectWithinMessageContent(data) {
    data.content.forEach(v => {
      if (_.isEmpty(v.text.annotations)) {
        delete v.text.annotations;
      } else {
        v.text.annotations = { ...v.text.annotations };
      }
    });
    data.content = { ...data.content };
    delete data.file_ids;
    Utils.TrimEmptyMetadataForResponseData(data);
  }

  static fromArrayToObjectWithinMessageList(data) {
    data.data.forEach(v => Utils.fromArrayToObjectWithinMessageContent(v));
    data.data = { ...data.data };
  }
}

module.exports = {
  Utils
};
