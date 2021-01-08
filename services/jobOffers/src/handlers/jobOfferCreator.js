import { Handler, Notification } from 'infrastructure';
import { saveJobOffer } from 'jobOfferStorage';

export const handle = new Handler('Job Offer Creator')
  .withHttpPayloadParser()
  .handle(async (event, context) => {
    const result = await saveJobOffer(event.payload);
    const notification = new Notification(
      process.env.JOB_OFFER_CREATED_TOPIC_ARN,
      {
        ownerId: event.payload.ownerId,
        jobOfferId: result._id
      }
    );

    await notification.send();

    return result;
  });
