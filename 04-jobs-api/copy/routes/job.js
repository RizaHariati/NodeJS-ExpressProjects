const express = require("express");
const {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} = require("../controller/job");
const jobRouter = express.Router();

jobRouter.route("/").get(getAllJobs).post(createJob);
jobRouter.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = jobRouter;
