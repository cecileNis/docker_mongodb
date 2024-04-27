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
    });
  });

  // Test pour supprimer un utilisateur
  it("should delete a user", () => {
    const userToDelete = {
      password: "delete",
      userId: 1, // Remplacez par un ID existant d'utilisateur
    };

    cy.request("DELETE", `${baseUrl}/user`, userToDelete).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq("User deleted successfully");
    });
  });
});
