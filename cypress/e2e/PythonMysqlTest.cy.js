describe("API Endpoints", () => {
  const baseUrl = "http://localhost:8000"; // Remplacez par l'URL de votre API

  // Test pour ajouter un utilisateur
  it("should add a new user", () => {
    const newUser = {
      lastname: "Wittke",
      firstname: "Tom",
      birthDate: "2000-03-12",
      zipCode: "06700",
      city: "Saint Laurent du Var",
      email: "Tom@live.com",
    };

    cy.request("POST", `${baseUrl}/user`, newUser).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("User added successfully");
    });
  });

  // Test pour obtenir la liste des utilisateurs
  it("should get the list of users", () => {
    cy.request(`${baseUrl}/users`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      // Ajoutez des assertions supplémentaires pour vérifier le contenu de la liste des utilisateurs
    });
  });

  // Test pour supprimer un utilisateur
  it("should delete a user", () => {
    const userToDelete = {
      password: "delete",
      userId: 1, // Remplacez par un ID existant d'utilisateur à supprimer
    };

    cy.request({
      method: "DELETE",
      url: `${baseUrl}/user`,
      body: userToDelete,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq("User deleted successfully");
    });
  });

  // Test de validation des données d'entrée lors de la création d'un utilisateur
  it("should return an error for invalid data when adding a new user", () => {
    const invalidUser = {
      lastname: null, // Nom invalide
      firstname: "", // Prénom invalide
      birthDate: "invalid-date", // Date invalide
      zipCode: "invalid-zip", // Code postal invalide
      city: null, // Ville invalide
      email: "invalid-email", // Email invalide
    };

    cy.request({
      method: "POST",
      url: `${baseUrl}/user`,
      body: invalidUser,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("detail");
    });
  });

  // Test pour supprimer un utilisateur qui n'existe pas
  it("should return an error when deleting a non-existent user", () => {
    const nonExistentUser = {
      password: "supprimer",
      userId: 2, // ID non existant
    };

    cy.request({
      method: "DELETE",
      url: `${baseUrl}/user`,
      body: nonExistentUser,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(500);
      expect(response.body).to.have.property("detail", "");
    });
  });
});
