import { Handler } from 'infrastructure';
import { updateJobOffer, getJobOfferById } from 'jobOfferStorage';

export const handle = new Handler('Job Offer Creator')
  .withPathParametersPayloadParser()
  .withHttpPayloadParser()
  .handle(async (event, context) => {
    const jobOfferToApply = await getJobOfferById(event.path.jobOfferId);
    const candidates = jobOfferToApply.candidates || [];
    candidates.push(event.payload.candidate);
    const result = await updateJobOffer(event.path.jobOfferId, {
      ...jobOfferToApply,
      candidates
    });

    return result;
  });
