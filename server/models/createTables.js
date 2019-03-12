import database from '../config/databaseConnection';

export default {

  createUsers() {
    const usersSchema = `
    CREATE TABLE IF NOT EXISTS users (
      userId SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      fullname TEXT NOT NULL,
      about TEXT NOT NULL,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      userImageUrl TEXT,
      view INTEGER DEFAULT 0
    );
    `;
    return database.query(usersSchema);
  },

  createEntries() {
    const entriesSchema = `
    CREATE TABLE IF NOT EXISTS entries (
      entryId SERIAL PRIMARY KEY,
      userId INTEGER REFERENCES users(userId),
      entryImageUrl TEXT,
      title TEXT NOT NULL,
      isPrivate BOOLEAN DEFAULT TRUE NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP (0) without time zone default now(),
      updated_at TIMESTAMP
    );
    `;
    return database.query(entriesSchema);
  },
  createFavourites() {
    const favouritesSchema = `
    CREATE TABLE IF NOT EXISTS favourites (
      favouriteId SERIAL PRIMARY KEY,
      entryId INTEGER REFERENCES entries(entryId),
      userId INTEGER REFERENCES users(userId),
      created_at TIMESTAMP (0) without time zone default now(),
      updated_at TIMESTAMP  
    );
    `;
    return database.query(favouritesSchema);
  },
};
