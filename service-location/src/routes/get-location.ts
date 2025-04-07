import { Request, Response } from "express";
import { geoAPI } from "../api";

const getLocation = async (req: Request, res: Response) => {
  try {
    console.log(req.publicAddress);

    const currentIP =
      process.env.ENV_MODE === "dev" ? process.env.DEV_IP : req.publicAddress;

    const geoQuery = `${currentIP}?token=${process.env.GEO_TOKEN as string}`;

    const getLocation = await geoAPI.get(geoQuery);

    if (getLocation.status !== 200) {
      throw new Error("locationError");
    }

    console.log(getLocation.data);

    const { city, region, country, postal } = getLocation.data;

    const payload = {
      city,
      region,
      country,
      postal,
    };

    res.status(200).send({ success: true, payload: payload });
  } catch (err: any) {
    res.status(404).send({ success: false });
  }
};

export { getLocation };
