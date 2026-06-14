const prisma = require("../config/prisma");
const aiService = require("./ai.service");
const leadQueue = require("../queues/lead.queue");



exports.createLead = async (data) => {

  const lead = await prisma.lead.create({
    data
  });

  return lead;
};


exports.getLeads = async () => {

  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" }
  });

};


exports.getLeadById = async (id) => {

  return prisma.lead.findUnique({
    where: { id }
  });

};


exports.updateLeadStatus = async (id, status) => {

  return prisma.lead.update({
    where: { id },
    data: { status }
  });

};

exports.createLead = async (data) => {

  const lead = await prisma.lead.create({
    data
  });

  const offer = await aiService.generateOffer(lead);

  await prisma.lead.update({
    where: { id: lead.id },
    data: { aiOffer: offer }
  });

  return lead;

};

exports.createLead = async (data) => {

  const lead = await prisma.lead.create({
    data: {
      ...data,
      status: "AI_PROCESSING"
    }
  });

  await leadQueue.add("generate-offer", lead,{
    attempts: 3,
    backoff:{
      type: "exponential",
      delay: 5000
    }
  });

  return lead;
};
