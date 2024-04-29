module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      title: String,
      releaseDate: String,
      duration: String
    },
    { timestamps: true }
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Movie = mongoose.model('movie', schema)
  return Movie
}
