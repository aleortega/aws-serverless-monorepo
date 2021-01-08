import { CandidateModel } from 'models';
import { connectToDatabase } from 'infrastructure';

export const saveCandidate = async (candidateToSave) => {
  await connectToDatabase();
  return CandidateModel.create(candidateToSave);
};

export const getCandidateByEmail = async (candidateEmail) => {
  await connectToDatabase();
  return CandidateModel.findOne({
    email: candidateEmail
  }).lean(true);
};
