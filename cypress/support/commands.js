// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <refence types"Cypress" />

/// <refence types"cypress-xpath" />

/*Cypress.Commands.add("loginComputer", (email,password,url)=>{
    cy.viewport(1280, 720);
    cy.visit(url);
    cy.get('#input-email').type(email);
    cy.get('#input-password').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.get('.min-h-screen > .h-full > .flex-1', { timeout: 10000 }).should('be.visible');
})*/