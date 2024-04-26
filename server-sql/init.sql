CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    birthDate VARCHAR(255) NOT NULL,
    zipCode VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

INSERT INTO Users (lastname, firstname, birthDate, zipCode, city, email)
VALUES ('Wittke', 'Tom', '2000-03-22', '06700', 'Saint laurent du var', 'wtom@live.fr');

INSERT INTO Users (lastname, firstname, birthDate, zipCode, city, email)
VALUES ('Calatayud', 'Vincent', '2001-05-07', '06000', 'Nice', 'vincent@hotmail.com');