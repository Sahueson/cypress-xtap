
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

    it('Explicit assertions', () => {

        cy.visit("https://portal-dev.x-tap.club/login")
        cy.get("input#input-email").type("ivan.c@alphaxperience.io")    // id tag is optional
        cy.get("input#input-password").type("xtap123")
        cy.get("button").click()

        let expName = "xyz";

        cy.get("h1").then((x) => {
            let actName = x.text()

        });
    });
})