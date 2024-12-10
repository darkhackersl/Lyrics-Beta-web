require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.static("frontend"));

app.get("/api/lyrics", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(
      `https://api.genius.com/search?q=${encodeURIComponent(query)}`,
      { headers: { Authorization: `Bearer ${process.env.GENIUS_API_KEY}` } }
    );

    const hits = response.data.response.hits;
    if (hits.length === 0) return res.json({ lyrics: "No lyrics found!" });

    const songUrl = hits[0].result.url;
    res.json({ lyrics: `Lyrics found! Check them out [here](${songUrl})` });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching lyrics");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
