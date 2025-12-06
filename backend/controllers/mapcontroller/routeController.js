// controllers/routeController.js
import { getRouteFromOSRM } from "../../services/routeService.js";

export const getRoute = async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end)
      return res.status(400).json({ error: "Both start & end coords required" });

    const route = await getRouteFromOSRM(start, end);
    res.json(route);
  } catch (err) {
    res.status(500).json({
      error: "Route generation failed",
      details: err.message,
    });
  }
};
