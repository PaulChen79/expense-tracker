const errorHandler = (error, req, res, next) => {
  if(error instanceof Error) {
    req.flash('error_messages', `${error.name}: ${error.message}`)
  } else {
    req.falsh('error_messages', `${error}`)
  }
  res.redirect('back')
  next()
}

module.exports = { errorHandler }