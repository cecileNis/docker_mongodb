const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8000",
    specPattern: [
      "cypress/e2e/NodeMongoTest.cy.js",
      "cypress/e2e/PythonMysqlTest.cy.js",
    ],
    supportFile: false,

    setupNodeEvents(on, config) {
      return config;
    },
  },
});
