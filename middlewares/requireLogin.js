
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must be logged in' });
  }
  else {
    console.log('NOT ALLOWED');
  }
  next();
};