

module.exports = {
  PORT: 3001,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 32770
  }
};