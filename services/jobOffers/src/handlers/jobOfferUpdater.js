import { Handler } from 'infrastructure';
import { updateJobOffer } from 'jobOfferStorage';

export const handle = new Handler('Job Offer Creator')
  .withHttpPayloadParser()
  .withPathParametersPayloadParser()
  .handle(async (event, context) => {
    const result = await updateJobOffer(event.path.jobOfferId, event.payload);

    return result;
  });
