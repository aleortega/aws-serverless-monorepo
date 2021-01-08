import { Handler } from 'infrastructure';
import { removeJobOffer } from 'jobOfferStorage';

export const handle = new Handler('Job Offer Creator')
  .withPathParametersPayloadParser()
  .handle(async (event, context) => {
    const result = await removeJobOffer(event.path.jobOfferId);
    return result;
  });
