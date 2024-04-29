module.exports = app => {
  const movies = require('../controllers/movie.controller.js')
  const router = require('express').Router()

  // Create a new Movie
  router.post('/', movies.create)

  // Retrieve all Movies
  router.get('/', movies.findAll)

  // Retrieve Movie by ID
  router.get('/:id', movies.findById)

  // Update Movie by ID
  router.put('/:id', movies.updateById)

  // Delete a Movie with id
  router.delete('/:id', movies.delete)

  // Delete all Movies
  router.delete('/', movies.deleteAll)

  app.use('/api/movies', router)
}
