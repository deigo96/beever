CREATE DATABASE beever;

CREATE TABLE quotes(
  id SERIAL,
  qoute TEXT,
  favorite VARCHAR DEFAULT 'false'
);

CREATE TABLE users(
  Id SERIAL,
  email VARCHAR(50),
  password VARCHAR(100)
);