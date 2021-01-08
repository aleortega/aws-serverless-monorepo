import { Handler } from 'infrastructure';
import { getJobOfferById } from 'jobOfferStorage';

export const handle = new Handler('Job Offer Retriever')
    .withPathParametersPayloadParser()
    .handle(async (event, context) => {
        return await getJobOfferById(event.path.jobOfferId);
    });
