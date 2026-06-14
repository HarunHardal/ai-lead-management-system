const { leadSchema } = require("../utils/validation");
const leadService = require("../services/lead.service");

exports.createLead = async (req, res, next) => {
  try {

    const data = leadSchema.parse(req.body);

    const lead = await leadService.createLead(data);

    res.json(lead);

  } catch (error) {
    next(error);
  }
};


exports.getLeads = async (req, res, next) => {
  try {

    const leads = await leadService.getLeads();

    res.json(leads);

  } catch (error) {
    next(error);
  }
};


exports.getLeadById = async (req, res, next) => {
  try {

    const lead = await leadService.getLeadById(Number(req.params.id));

    res.json(lead);

  } catch (error) {
    next(error);
  }
};


exports.updateLeadStatus = async (req, res, next) => {
  try {

    const { status } = req.body;

    const lead = await leadService.updateLeadStatus(
      Number(req.params.id),
      status
    );

    res.json(lead);

  } catch (error) {
    next(error);
  }
};