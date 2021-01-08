import { Handler } from 'infrastructure';
import { getRecruiterByEmail } from 'recruiterStorage';

export const handle = new Handler('Recruiter Retriever')
  .withPathParametersPayloadParser()
  .handle(async (event, context) => {
    return await getRecruiterByEmail(event.path.recruiterEmail);
  });
