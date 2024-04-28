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
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("User added successfully");
    });
  });

  // Test pour ajouter un utilisateur mais avec des données non conforme
  it("should add a new user with wrongs informations", () => {
    const newUser = {
      lastname: null,
      firstname: "Tom",
      birthDate: "2000-03-12",
      zipCode: "06700",
      city: null,
      email: "Tom@live.com",
    };

    cy.request({
      method: "POST",
      url: `${baseUrl}/user`,
      body: newUser,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(500);
      // expect(response.body).to.have.property("message");
    });
  });

  // Test pour obtenir la liste des utilisateurs
  it("should get the list of users", () => {
    cy.request(`${baseUrl}/users`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  // Test pour supprimer un utilisateur
  it("should delete a user", () => {
    // Ajoutez d'abord un utilisateur à supprimer
    const newUser = {
      lastname: "Wittke",
      firstname: "Tom",
      birthDate: "2000-03-12",
      zipCode: "06700",
      city: "Saint Laurent du Var",
      email: "Tom@live.com",
    };

    // Créez l'utilisateur
    cy.request({
      method: "POST",
      url: `${baseUrl}/user`,
      body: newUser,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      const userId = response.body.result._id;

      // Supprimez l'utilisateur
      cy.request({
        method: "DELETE",
        url: `${baseUrl}/user`,
        body: {
          userId: userId,
          password: "delete", // Utilisez le mot de passe admin pour autoriser la suppression
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
        expect(deleteResponse.body.message).to.eq("User deleted successfully");
      });
    });
  });

  // Test pour supprimer un utilisateur mais avec mauvais mot de passe
  it("should delete a user", () => {
    // Ajoutez d'abord un utilisateur à supprimer
    const newUser = {
      lastname: "Wittke",
      firstname: "Tom",
      birthDate: "2000-03-12",
      zipCode: "06700",
      city: "Saint Laurent du Var",
      email: "Tom@live.com",
    };

    // Créez l'utilisateur
    cy.request({
      method: "POST",
      url: `${baseUrl}/user`,
      body: newUser,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      const userId = response.body.result._id;

      // Supprimez l'utilisateur en utilisant un mauvais mot de passe
      cy.request({
        method: "DELETE",
        url: `${baseUrl}/user`,
        body: {
          userId: userId,
          password: "supprimer", // Utilisez le mot de passe admin pour autoriser la suppression
        },
        headers: {
          "Content-Type": "application/json",
        },
        failOnStatusCode: false,
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(401);
        expect(deleteResponse.body.message).to.eq("Permission denied.");
      });
    });
  });
});
