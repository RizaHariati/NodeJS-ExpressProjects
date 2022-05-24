const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");

const getAllJobs = async (req, res, next) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs: "get all jobs" });
};

const createJob = async (req, res, next) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.CREATED).json({ jobs: "create a job" });
};

const updateJob = async (req, res, next) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.ACCEPTED).json({ jobs: "update a job" });
};

const getJob = async (req, res, next) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs: "get a job" });
};

const deleteJob = async (req, res, next) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs: "delete a job" });
};

module.exports = { getAllJobs, createJob, updateJob, getJob, deleteJob };
