db = db.getSiblingDB("ynov_ci");

db.users.insertMany([
  {
    lastname: "Calatayud",
    firstname: "Vincent",
    birthDate: "07/05/2001",
    zipCode: "06700",
    city: "Nice",
    email: "vincent@live.fr",
  },
]);
