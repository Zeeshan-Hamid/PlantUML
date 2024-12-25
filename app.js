const express = require("express");
const plantumlEncoder = require("plantuml-encoder");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to process PlantUML code
app.post("/generate-diagram", async (req, res) => {
  try {
    const { umlCode } = req.body;

    if (!umlCode) {
      return res.status(400).send("PlantUML code is required.");
    }

    // Encode the UML code
    const encodedUml = plantumlEncoder.encode(umlCode);

    // Fetch the diagram from the PlantUML public server
    const diagramUrl = `http://www.plantuml.com/plantuml/svg/${encodedUml}`;
    const response = await axios.get(diagramUrl, { responseType: "text" });

    // Send the SVG back as the response
    res.send(response.data);
  } catch (error) {
    console.error("Error generating diagram:", error.message);
    res.status(500).send("Failed to generate diagram.");
  }
});

// Serve the frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
