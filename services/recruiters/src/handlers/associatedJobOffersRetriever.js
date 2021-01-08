import { Handler } from 'infrastructure';
import { getOwnedJobOfferById } from 'jobOfferStorage';
import { getRecruiterByEmail } from 'recruiterStorage';

export const handle = new Handler("Recruiter's Job Offers Retriever")
  .withPathParametersPayloadParser()
  .handle(async (event, context) => {
    const recruiterAssociated = await getRecruiterByEmail(
      event.path.recruiterEmail
    );
    const jobOffersRetrievementPromises = recruiterAssociated.jobOffersOwned.map(
      (jobOfferId) => getOwnedJobOfferById(jobOfferId)
    );

    return (await Promise.all(jobOffersRetrievementPromises)).filter(
      (jobOffer) => !!jobOffer
    );
  });
