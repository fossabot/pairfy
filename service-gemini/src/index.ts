import express from "express";
import { catcher, logger } from "./utils/index.js";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

import pkg from 'body-parser';       
                                                                                                                                                      
const { json, urlencoded } = pkg; 

const main = async () => {
  try {
    if (!process.env.POD_NAME) {
      throw new Error("POD_NAME error");
    }

    if (!process.env.POD_TIMEOUT) {
      throw new Error("POD_TIMEOUT error");
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY error");
    }

    const app = express();

    app.use(urlencoded({ extended: true, parameterLimit: 15 }));

    app.use(json({ limit: 5000000 }));

    const port = 8000;
    /////////////////////////////////////////////////////////////////////////

    const errorEvents: string[] = [
      "exit",
      "SIGINT",
      "SIGTERM",
      "SIGQUIT",
      "uncaughtException",
      "unhandledRejection",
      "SIGHUP",
      "SIGCONT",
    ];

    errorEvents.forEach((e: string) => process.on(e, (err) => catcher(e, err)));

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    app.get("/api/gemini/healthz", (req, res) => {
      res.status(200).send("OK");
    });

    app.post("/api/gemini/test", async (req, res) => {
      const params = req.body;
      
      console.log(params);

      //LENGTH

      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      let prepare =
        "generates an array with the most important features first, separated by commas using the language of the following text: ";

      const inputText = (prepare += params.content);

      const result = await chatSession.sendMessage(inputText);

      const response = {
        success: true,
        payload: result.response.text(),
      };

      res.status(200).send(response);
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    logger.info("ONLINE");
  } catch (err) {
    catcher(err);
  }
};

main();
