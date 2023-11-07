const express = require("express");
const axios = require("axios");
const moviesRouter = express.Router();
require("dotenv").config();



moviesRouter.get("/", async (req, res) => {
  try {
    // Make a GET request to the Spoonacular API
    const response = await axios.get(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${process.env.API_KEY}`
    );

    // Extract the movie data from the response
    const movies = response.data;

    // Send the movies to the client
    res.status(200).send({ message: "data", movies });
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error fetching random movies:", error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching random movies" });
  }
});

// Define a route to fetch searched movies
moviesRouter.get("/search", async (req, res) => {
  const { query } = req.query;
  const response = await axios.get(
    `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${query}`
  );
  const movies = response.data;
  res.status(200).send({ message: "data", movies });
});

// Define a route to fetch single movies
moviesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await axios.get(
    `https://www.omdbapi.com/?i=${id}&apiKey=${process.env.API_KEY}`
  );
  const movie = response.data;
  res.status(200).send({ message: "data", movie });
});


module.exports = {
  moviesRouter,
};
