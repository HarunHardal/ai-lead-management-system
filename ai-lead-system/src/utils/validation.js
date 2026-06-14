const { z } = require("zod");

exports.leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  service: z.string(),
  budget: z.string()
});