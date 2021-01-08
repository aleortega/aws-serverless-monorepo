import { Handler } from 'infrastructure';
import { lookJobOffersBy } from 'jobOfferStorage';

export const handle = new Handler('Job Offer Searcher')
    .withQueryStringParametersParser()
    .handle(async (event, context) => {
        return await lookJobOffersBy(event.query);
    });
