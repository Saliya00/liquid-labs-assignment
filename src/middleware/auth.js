// Middleware to check if the API calls are authenticated with the api_key
module.exports = (req, res, next) => {
  const apiKey = req.header('x-api-key');

  if (!apiKey) {
    return res.status(401).json({
      message: 'API key is required',
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      message: 'Invalid API key',
    });
  }

  next();
};
