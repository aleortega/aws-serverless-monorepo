import loggerFactory from './loggerFactory';

class Handler {
  constructor(callerModule) {
    this.callerModule = callerModule;
    this.logger = loggerFactory.getFrom('Handler');
    this.parseError = this.genericErrorParser;
    this.parserFunctions = [];
  }

  queuePayloadParser(rawPayload) {
    return JSON.parse(JSON.parse(rawPayload.Records[0].body).Message);
  }

  withQueuePayloadParser() {
    this.parserFunctions.push({
      exec: this.queuePayloadParser,
      destiny: 'message'
    });
    return this;
  }

  httpPayloadParser(rawPayload) {
    return JSON.parse(rawPayload.body);
  }

  withHttpPayloadParser() {
    this.parserFunctions.push({
      exec: this.httpPayloadParser,
      destiny: 'payload'
    });
    return this;
  }

  pathParametersPayloadParser(rawPayload) {
    return rawPayload.pathParameters;
  }

  withPathParametersPayloadParser() {
    this.parserFunctions.push({
      exec: this.pathParametersPayloadParser,
      destiny: 'path'
    });
    return this;
  }

  queryStringParametersParser(rawPayload) {
    const FIRST_PAGE = 1;
    const { queryStringParameters } = rawPayload;
    const queryStringParametersKeys = Object.keys(queryStringParameters);
    const result = queryStringParametersKeys.reduce(
      (accumulator, current) => {
        accumulator[current] = queryStringParameters[current].includes(',')
          ? queryStringParameters[current].split(',')
          : queryStringParameters[current];
        return { ...accumulator };
      },
      {
        limit: process.env.DEFAULT_LIMIT_PAGINATION,
        page: FIRST_PAGE
      }
    );
    return result;
  }

  withQueryStringParametersParser() {
    this.parserFunctions.push({
      exec: this.queryStringParametersParser,
      destiny: 'query'
    });
    return this;
  }

  genericErrorParser(error) {
    return {
      body: JSON.stringify({ error: error.message }),
      statusCode: 500
    };
  }

  withCustomErrorParser(errorParserFunction) {
    this.parseError = errorParserFunction;
    return this;
  }

  parseEvent(event) {
    const parsedEvent = {};
    this.parserFunctions.forEach((parseFunction) => {
      parsedEvent[parseFunction.destiny] = parseFunction.exec(event);
    });

    return parsedEvent;
  }

  handle(lambda) {
    return async (event, context) => {
      let body, statusCode;
      try {
        const parsedEvent = this.parseEvent(event);
        this.logger.info(
          `Processing event input: ${JSON.stringify(parsedEvent)}`
        );
        body = JSON.stringify(await lambda(parsedEvent, context));
        statusCode = 200;
        this.logger.info(`Event successfully processed.\nAnswer: ${body}`);
      } catch (error) {
        this.logger.info(
          `An error occurred while processing the event.\nError: ${error.message}`
        );
        const parsedError = this.parseError(error);
        body = parsedError.body;
        statusCode = parsedError.statusCode;
      } finally {
        return { body, statusCode };
      }
    };
  }
}

export default Handler;
