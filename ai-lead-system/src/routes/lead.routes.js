const router = require("express").Router();
const leadController = require("../controllers/lead.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, leadController.createLead);

router.get("/", authMiddleware, leadController.getLeads);

router.get("/:id", authMiddleware, leadController.getLeadById);

router.patch("/:id/status", authMiddleware, leadController.updateLeadStatus);

module.exports = router;