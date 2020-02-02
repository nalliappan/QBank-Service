module.exports = {
    name: 'QBank Services',
    env: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 8091,
      base_url: process.env.BASE_URL || 'http://localhost:8091',
      db: {
          //uri: process.env.MONGODB_URI || 'mongodb+srv://testGenerator:testGenerator@svsc-4hgcl.mongodb.net/test?retryWrites=true&w=majority'
          uri: 'mongodb://localhost:27017/admin?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
      },
  }