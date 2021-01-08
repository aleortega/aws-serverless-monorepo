import { JobOfferModel, OwnedJobOfferModel } from 'models';
import { connectToDatabase } from 'infrastructure';

const UPDATE_DEFAULT_CONFIG = {
  lean: true,
  new: true
};

export const saveJobOffer = async (jobOfferToSave) => {
  await connectToDatabase();
  return JobOfferModel.create(jobOfferToSave);
};

export const getJobOfferById = async (jobOfferId) => {
  await connectToDatabase();
  return JobOfferModel.findById(jobOfferId).lean(true);
};

export const getOwnedJobOfferById = async (jobOfferId) => {
  await connectToDatabase();
  return OwnedJobOfferModel.findById(jobOfferId).lean(true);
};

export const updateJobOffer = async (jobOfferId, newJobOffer) => {
  await connectToDatabase();
  return JobOfferModel.findByIdAndUpdate(
    jobOfferId,
    newJobOffer,
    UPDATE_DEFAULT_CONFIG
  );
};

export const removeJobOffer = async (jobOfferId) => {
  await connectToDatabase();
  return JobOfferModel.findByIdAndUpdate(
    jobOfferId,
    { isDeleted: true },
    UPDATE_DEFAULT_CONFIG
  );
};

export const lookJobOffersBy = async (parameters) => {
  await connectToDatabase();
  return JobOfferModel.find({
    requiredSkills: { $in: parameters.skills },
    status: 'Open'
  })
    .skip(Number((parameters.page - 1) * parameters.limit))
    .limit(Number(parameters.limit))
    .lean(true);
};
