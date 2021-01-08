import { Handler, Notification } from 'infrastructure';
import { signUpUser } from 'authenticator';
import customErrorParser from 'customErrorParser';

export const handle = new Handler('User Authenticator')
  .withHttpPayloadParser()
  .withCustomErrorParser(customErrorParser)
  .handle(async (event, context) => {
    const result = await signUpUser(event.payload);
    const notification = new Notification(
      process.env.USER_SIGNED_UP_TOPIC_ARN,
      event.payload,
      {
        profileType: {
          DataType: 'String',
          StringValue: event.payload.profileType.toUpperCase()
        }
      }
    );

    await notification.send();
    return result;
  });
