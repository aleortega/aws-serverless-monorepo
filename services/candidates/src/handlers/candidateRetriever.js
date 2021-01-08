import { Handler } from 'infrastructure';
import { getCandidateByEmail } from 'candidateStorage';

export const handle = new Handler('Candidate Retriever')
  .withPathParametersPayloadParser()
  .handle(async (event, context) => {
    return await getCandidateByEmail(event.path.candidateEmail);
  });