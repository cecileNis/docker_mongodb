const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8000",
    specPattern: "cypress/e2e/test.cy.js",
    supportFile: false,

    setupNodeEvents(on, config) {
      return config;
    },
  },
});
