import { Handler } from 'infrastructure';
import { linkJobOfferToRecruiter } from 'recruiterStorage';

export const handle = new Handler('Job Offer Adder')
  .withQueuePayloadParser()
  .handle(async (event, context) => {
    const { ownerId, jobOfferId } = event.message;
    return await linkJobOfferToRecruiter(ownerId, jobOfferId);
  });