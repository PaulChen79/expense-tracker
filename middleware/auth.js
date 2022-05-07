module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    } else {
      req.flash('warning_messages', 'You have to login to use this app.')
      res.redirect('/users/login')
    }
  }
}