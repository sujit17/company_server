module.exports = {
    
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3001,
  URL: process.env.BASE_URL || "https//localhost:3001",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://admin:0017@company.boufh.mongodb.net/companyDB?retryWrites=true&w=majority",
};
