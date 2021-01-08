import { RecruiterModel } from 'models';
import { connectToDatabase } from 'infrastructure';

export const saveRecruiter = async (recruiterToSave) => {
  await connectToDatabase();
  return RecruiterModel.create(recruiterToSave);
};

export const getRecruiterByEmail = async (recruiterEmail) => {
  await connectToDatabase();
  return RecruiterModel.findOne({
    email: recruiterEmail
  }).lean(true);
};

export const linkJobOfferToRecruiter = async (ownerId, jobOfferId) => {
  await connectToDatabase();
  return RecruiterModel.update(
    {
      _id: ownerId
    },
    { $push: { jobOffersOwned: jobOfferId } }
  );
};
