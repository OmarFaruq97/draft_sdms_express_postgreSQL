import { preSurgicalService } from "../services/preSurgicalService.js";

export async function handlePreSurgical(req, res, next) {
  try {
    const result = await preSurgicalService(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
