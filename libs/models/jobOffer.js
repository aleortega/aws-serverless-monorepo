import * as mongoose from 'mongoose';
import { usingSchemaAsModel } from './../interfaces/mongooseMiddlewares';

class JobOffer {
  constructor({
    title,
    ownerId,
    description,
    status,
    companyName,
    industry,
    location,
    employmentType,
    duration,
    positionsQuantity,
    requiredSkills,
    salaryDetails,
    startDate,
    endDate,
    questionnaire = [],
    autoAssignCandidates = false,
    candidates = []
  }) {
    this.title = title;
    this.ownerId = ownerId;
    this.description = description;
    this.status = status;
    this.companyName = companyName;
    this.industry = industry;
    this.location = location;
    this.employmentType = employmentType;
    this.duration = duration;
    this.positionsQuantity = positionsQuantity;
    this.requiredSkills = requiredSkills;
    this.salaryDetails = salaryDetails;
    this.startDate = startDate;
    this.endDate = endDate;
    this.questionnaire = questionnaire;
    this.autoAssignCandidates = autoAssignCandidates;
    this.candidates = candidates;
    this.isDeleted = false;
  }
}

const jobOfferSchema = new mongoose.Schema({
  title: String,
  ownerId: String,
  description: String,
  companyName: String,
  industry: String,
  location: Object,
  employmentType: String,
  duration: Object,
  requiredSkills: Array,
  salaryDetails: Object,
  startDate: Date,
  endDate: Date,
  questionnaire: Array,
  candidates: Array
});

jobOfferSchema.pre('find', usingSchemaAsModel(jobOfferSchema));

const JobOfferModel = mongoose.model('JobOffer', jobOfferSchema);

const ownedJobOfferSchema = new mongoose.Schema(
  {
    title: String,
    ownerId: String,
    description: String,
    status: String,
    companyName: String,
    industry: String,
    location: Object,
    employmentType: String,
    duration: Object,
    positionsQuantity: Number,
    requiredSkills: Array,
    salaryDetails: Object,
    startDate: Date,
    endDate: Date,
    questionnaire: Array,
    autoAssignCandidates: Boolean,
    candidates: Array,
    isDeleted: Boolean
  },
  {
    collection: 'joboffers'
  }
);

ownedJobOfferSchema.pre('find', usingSchemaAsModel(ownedJobOfferSchema));

const OwnedJobOfferModel = mongoose.model('OwnedJobOffer', ownedJobOfferSchema);

export { JobOffer, JobOfferModel, OwnedJobOfferModel };
