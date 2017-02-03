const setEnvDefault = (key, val) => {
  if (!process.env[key]) process.env[key] = val;
};

setEnvDefault('NODE_ENV', 'development');
setEnvDefault('PORT', 3000);

module.exports = setEnvDefault;
