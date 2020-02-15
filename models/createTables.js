import database from '../config/databaseConnection';

export default {

  createUsers() {
    const usersSchema = `
    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      fullname TEXT NOT NULL,
      about TEXT,
      username VARCHAR(255) NOT NULL UNIQUE,
      password TEXT NOT NULL,
      user_image_url TEXT,
      notification_settings TEXT DEFAULT "Off" 
    );
    `;
    return database.query(usersSchema);
  },
  createImageGalleries() {
    const galleriesSchema = `
    CREATE TABLE IF NOT EXISTS image_galleries (
      gallery_id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id),
      image_id TEXT NOT NULL,
      image_url TEXT NOT NULL
    );
    `;
    return database.query(galleriesSchema);
  },
  createEntries() {
    const entriesSchema = `
    CREATE TABLE IF NOT EXISTS entries (
      entry_id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id),
      entry_image_url TEXT,
      title TEXT NOT NULL,
      is_private BOOLEAN DEFAULT TRUE NOT NULL,
      view_count INTEGER DEFAULT 0, 
      content TEXT NOT NULL,
      created_at TIMESTAMP (0) without time zone default now(),
      updated_at TIMESTAMP
    );
    `;
    return database.query(entriesSchema);
  },
};
