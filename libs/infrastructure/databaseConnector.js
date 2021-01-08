import mongoose from 'mongoose';
import loggerFactory from './loggerFactory';

const logger = loggerFactory.getFrom('Database Connector');

mongoose.Promise = global.Promise;
let databaseIsConnected;

const connectToDatabase = () => {
  if (databaseIsConnected) {
    logger.info('Re-using database connection from context');
    return Promise.resolve();
  }

  logger.info('Creating a new database connection');
  return mongoose
    .connect(
      process.env.DATABASE_CONNECTION_URI,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then((database) => {
      databaseIsConnected = database.connections[0].readyState;
    });
};

export default connectToDatabase;
