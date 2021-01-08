import { SNS } from 'aws-sdk';
import loggerFactory from './loggerFactory';

class Notification {
  constructor(topicArn, body, attributes = {}) {
    this.topicArn = topicArn;
    this.body = body;
    this.attributes = attributes;
    this.sender = new SNS({ apiVersion: '2010-03-31' });
    this.logger = loggerFactory.getFrom('Notification');
  }

  toMessage() {
    return {
      TopicArn: this.topicArn,
      Message: JSON.stringify(this.body),
      MessageAttributes: this.attributes
    };
  }

  async send() {
    return new Promise((resolve, reject) => {
      const messageToSend = this.toMessage();

      this.logger.info(
        `Sending notification to: ${
          this.topicArn
        }.\nNotification: ${JSON.stringify(messageToSend)}`
      );

      this.sender.publish(messageToSend, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result);
      });
    });
  }
}

export default Notification;
