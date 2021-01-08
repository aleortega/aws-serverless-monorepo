const mongoose = require('mongoose');

const modelName = 'Candidate';

class Candidate {
  constructor({
    firstName,
    lastName,
    email,
    phone,
    location,
    description,
    workingInformation,
    searchInformation,
    jobOffersApplied
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.location = location;
    this.description = description;
    this.workingInformation = workingInformation;
    this.searchInformation = searchInformation;
    this.jobOffersApplied = jobOffersApplied;
  }
}

const CandidateModel = mongoose.model(
  modelName,
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    location: Object,
    description: String,
    workingInformation: Object,
    searchInformation: Object,
    jobOffersApplied: Array
  })
);

export { Candidate, CandidateModel };
