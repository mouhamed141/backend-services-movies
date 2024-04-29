const db = require('../models')
const Movie = db.movies

// Create and Save a new Movie
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: 'Content can not be empty!' })
    return
  }
  // Create a Movie
  const movie = new Movie({
    title: req.body.title,
    releaseDate: req.body.releaseDate,
    duration: req.body.duration
  })

  // Save Movie in the database
  movie
    .save(movie)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Movie.'
      })
    })
}

// Retrieve all Movies from the database.
exports.findAll = (req, res) => {
  const title = req.query.title
  const condition = title
    ? { title: { $regex: new RegExp(title), $options: 'i' } }
    : {}

  Movie.find(condition)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving movies.'
      })
    })
}

// Retrieve Movie from the database by ID
exports.findById = (req, res) => {
  const id = req.params.id

  Movie.findById(id)
    .then(movie => {
      if (!movie) {
        return res.status(404).send({
          message: `Movie with id ${id} not found.`
        })
      }
      res.send(movie)
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving movie with id ${id}: ${err.message}`
      })
    })
}

// Update  a Movie identified by the id in the request
exports.updateById = (req, res) => {
  const id = req.params.id

  Movie.findByIdAndUpdate(id, req.body, { new: true })
    .then(movie => {
      if (!movie) {
        return res.status(404).send({
          message: `Movie with id ${id} not found.`
        })
      }
      res.send(movie)
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating movie with id ${id}: ${err.message}`
      })
    })
}

// Delete a Movie with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id
  Movie.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
        })
      } else {
        res.send({
          message: 'Movie was deleted successfully!'
        })
      }
    })
    // eslint-disable-next-line n/handle-callback-err
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Movie with id=' + id
      })
    })
}

// Delete all Movies from the database.
exports.deleteAll = (req, res) => {
  Movie.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Movies were deleted successfully!`
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all movies.'
      })
    })
}
