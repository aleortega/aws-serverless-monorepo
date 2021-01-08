const mongoose = require('mongoose');

const modelName = 'Recruiter';

class Recruiter {
  constructor({
    firstName,
    lastName,
    email,
    phone,
    location,
    hiringModel,
    description,
    workingInformation,
    searchInformation,
    jobOffersOwned
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.location = location;
    this.hiringModel = hiringModel;
    this.description = description;
    this.workingInformation = workingInformation;
    this.searchInformation = searchInformation;
    this.jobOffersOwned = jobOffersOwned;
  }
}

const RecruiterModel = mongoose.model(
  modelName,
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    location: Object,
    hiringModel: String,
    description: String,
    workingInformation: Object,
    searchInformation: Object,
    jobOffersOwned: Array
  })
);

export { Recruiter, RecruiterModel };
