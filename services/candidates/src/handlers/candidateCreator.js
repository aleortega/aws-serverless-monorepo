import { Handler } from 'infrastructure';
import { saveCandidate } from 'candidateStorage';

export const handle = new Handler('Candidate Creator')
  .withQueuePayloadParser()
  .handle(async (event, context) => {
      return await saveCandidate(event.message);
  });
