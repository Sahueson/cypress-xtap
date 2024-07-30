
describe("Assertions demo", () => {
    it("Implicit assertions", () => {
        cy.visit("https://portal-dev.x-tap.club/login");

        // should and
        //cy.url().should('include', 'x-tap.club')
        //cy.url().should('eq', 'https://portal-dev.x-tap.club/login')
        //cy.url().should('contain', 'x-tap')

        //cy.url().should('include', 'x-tap.club').should('eq', 'https://portal-dev.x-tap.club/login').should('contain', 'x-tap')

        cy.url().should('include', 'x-tap.club').and('eq', 'https://portal-dev.x-tap.club/login').and('contain', 'x-tap')

        cy.get('img').should('exist')


    });
});