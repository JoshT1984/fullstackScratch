DROP TABLE IF EXISTS deck;
DROP TABLE IF EXISTS picture;

CREATE TABLE deck (
deck_id serial PRIMARY KEY,
background_color text,
card_number varchar(255)
);

CREATE TABLE picture (
id serial PRIMARY KEY,
spongebobImageName VARCHAR (255),
file_path VARCHAR (255),
deck_id INTEGER,
FOREIGN KEY(deck_id) REFERENCES deck(deck_id)
);











