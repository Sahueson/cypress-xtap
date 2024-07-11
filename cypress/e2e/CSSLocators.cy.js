
describe('CSSLocators', () => {

    it("csslocators", () => {

        cy.visit("https://portal-dev.x-tap.club/login")
        cy.get("input#input-email").type("ivan.c@alphaxperience.io")    // id tag is optional
        cy.get("input#input-password").type("xtap123")
        cy.get("button").click()

        cy.get("h1").contains("Dashboard") //Assertion

        

    })

})