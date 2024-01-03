const Ainize = require("@ainize-team/ainize-sdk").default;

const { getRequestMaterialsFromJobType, callOpenai } = require('../data');
const { ErrorUtil } = require('./error');
const { Utils } = require('./utils');
const { AINIZE_PRIVATE_KEY } = require('../env');

const ainizeAdmin = new Ainize(0);
ainizeAdmin.login(AINIZE_PRIVATE_KEY);

// TODO(all): Fill in the handlers.
class OpenaiAinizeHandler {
  static service = async (req, res, next) => {
    try {
      // const {
      //   jobType, model, name, description, instructions, assistantId,
      //   limit, order, after, before
      // } = req.body;
      const { requestData } = ainizeAdmin.internal.getDataFromServiceRequest(req);
      // const {
      //   requestMethod,
      //   getRequestUrlFunction,
      //   getRequestBodyFunction
      // } = getRequestMaterialsFromJobType(jobType);
      // const requestUrl = getRequestUrlFunction((assistantId ? [assistantId]: []));
      // const query = Object.entries({ limit, order, after, before })
      // .filter(([k, e]) => e)
      // .reduce((acc, [k, e]) => {
      //     return acc + `${k}=${e}&`
      //   }, "?")
      // .slice(0, -1);
      // const requestBodyFromUserInput = {
      //   ...(model && { model }),
      //   ...(name && { name }),
      //   ...(description && { description }),
      //   ...(instructions && { instructions }),
      // };
      // const requestBody = (getRequestBodyFunction && getRequestBodyFunction(requestBodyFromUserInput));
      // const response = await callOpenai({
      //   method: requestMethod,
      //   url: requestUrl + query,
      //   ...(requestBody && { body: requestBody })
      // });

      await ainizeAdmin.internal.handleRequest().handleRequest(req, 0, 200, requestData);
      // res.status(200).json(Utils.serializeMessage(`${jobType} ok`, response?.data));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static deposit = (req, res, next) => {
    try {
      res.status(200).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  // NOTE(minsu): below will be deprecated soon.
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

  static createThread = (req, res, next) => {
    try {
      res.status(201).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static deleteThread = (req, res, next) => {
    try {
      res.status(200).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static getThread = (req, res, next) => {
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

  static createMessage = (req, res, next) => {
    try {
      res.status(201).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }

  static getMessage = (req, res, next) => {
    try {
      res.status(200).json(Utils.serializeMessage('ok', { hello: 'world' }));
    } catch (error) {
      throw ErrorUtil.setCustomError(500, error);
    }
  }
}

module.exports = {
  OpenaiAinizeHandler
};
