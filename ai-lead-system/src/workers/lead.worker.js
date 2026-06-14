const { Worker } = require("bullmq");
const prisma = require("../config/prisma");
const redis = require("../config/redis");
const aiService = require("../services/ai.service");
const pdfService = require("../services/pdf.service");
const emailService = require("../services/email.service");

const worker = new Worker(
  "lead-processing",
  async (job) => {
    try {
      const lead = job.data;

      console.log("Yeni job alındı:", lead.id);

      const offer = await aiService.generateOffer(lead);

      const pdfPath = pdfService.generatePDF(lead, offer);

      await emailService.sendOfferEmail(lead, pdfPath)

      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          aiOffer: offer,
          pdfPath: pdfPath,
          emailSent: true,
          status: "AI_COMPLETED"
        }
      });

      console.log("AI tamamlandı:", lead.id);

    } catch (error) {
      console.error("Worker hata verdi:", error);
      throw error;
    }
  },
  {
    connection: redis
  }
);

worker.on("completed", (job) => {
  console.log(`Job tamamlandı: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.log(`Job hata verdi: ${job.id}`, err.message);
});

module.exports = worker;