const express = require("express");
const torrentSearch = require("torrent-search-api");
const router = express.Router();

torrentSearch.enablePublicProviders(); // Enable public torrent providers

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", torrents: [] });
});

router.get("/search", function (req, res, next) {
  res.render("index", { title: "Express", torrents: [] });
});

router.post("/search", async (req, res) => {
  const searchTerm = req.body.searchTerm;

  try {
    //TODO filter by category
    //TODO pagination
    const torrents = await torrentSearch.search(searchTerm, "All");
    res.render("index", { torrents });
  } catch (err) {
    console.error(err);
    res.render("error");
  }
});

module.exports = router;
