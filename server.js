import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.post("/speak", async (req, res) => {
  try {
    const { text } = req.body;

    console.log("Texto:", text);

    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/rEVYTKPqwSMhytFPayIb",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVEN_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
        }),
      }
    );

    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

app.listen(3001, () => {
  console.log("Servidor activo en puerto 3001");
});