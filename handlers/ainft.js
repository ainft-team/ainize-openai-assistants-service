const { ErrorUtil } = require('./error');
const { Utils } = require('./utils');

// TODO(all): Fill in the handlers
class AinftHandler {
  static chargeAinizeCredit = (req, res, next) => {
    try {
      res.status(200).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static getAinizeCredit = (req, res, next) => {
    try {
      res.status(200).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static createAssistants = (req, res, next) => {
    try {
      res.status(201).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static updateAssistants = (req, res, next) => {
    try {
      res.status(200).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static deleteAssistants = (req, res, next) => {
    try {
      res.status(200).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static getAssistants = (req, res, next) => {
    try {
      res.status(200).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static listAssistants = (req, res, next) => {
    try {
      res.status(200).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static createThreads = (req, res, next) => {
    try {
      res.status(201).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static deleteThreads = (req, res, next) => {
    try {
      res.status(200).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static getThreads = (req, res, next) => {
    try {
      res.status(200).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static listThreads = (req, res, next) => {
    try {
      res.status(200).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static createMessages = (req, res, next) => {
    try {
      res.status(201).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static getMessages = (req, res, next) => {
    try {
      res.status(200).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }
}

module.exports = {
  AinftHandler
};
