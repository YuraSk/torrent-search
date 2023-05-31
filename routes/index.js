const express = require("express");
const torrentSearch = require("torrent-search-api");
const router = express.Router();

torrentSearch.enablePublicProviders(); // Enable public torrent providers

/* GET home page. */
router.get("/", async (req, res, next) => {
  const resultsPerPage = 25;
  const searchTerm = req.query.search || "";
  const currentPage = parseInt(req.query.page) || 1;

  try {
    const result = await torrentSearch.search(searchTerm, "All");
    const totalPages = Math.ceil(result.length / resultsPerPage);
    const startIndex = (currentPage - 1) * resultsPerPage;
    const torrents = result.slice(startIndex, startIndex + resultsPerPage);

    res.render("index", {
      torrents,
      currentPage,
      totalPages,
      searchTerm,
    });
  } catch (err) {
    console.error(err);
    res.render("error");
  }
});

module.exports = router;
