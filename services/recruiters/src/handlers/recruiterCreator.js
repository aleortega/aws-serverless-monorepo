import { Handler } from 'infrastructure';
import { saveRecruiter } from 'recruiterStorage';

export const handle = new Handler('Recruiter Creator')
  .withQueuePayloadParser()
  .handle(async (event, context) => {
    return await saveRecruiter(event.message);
  });
