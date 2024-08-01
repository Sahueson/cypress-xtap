describe('Visitar xtap y verificar title', () => {
    
    it('test1-verify title-positive', () => {
        cy.visit("https://portal-dev.x-tap.club/login")
        cy.title().should('eq','PORTAL X-TAP')
    })
        
    it('test2-verify title-negative', () => {
        cy.visit("https://portal-dev.x-tap.club/login")
        cy.title().should('not.eq','PORTAL X-TAP123')
    })

    
    it("Login", () => {

        cy.visit("https://portal-dev.x-tap.club/login")
        cy.get("input#input-email").type("ivan.c@alphaxperience.io")    // id tag is optional
        cy.get("input#input-password").type("xtap123")
        cy.get("button").click()

        cy.get("h1").contains("Dashboard") //Assertion
        cy.get('.btn').click()
        cy.get(':nth-child(1) > .justify-center > .h-auto > img').should('be.visible')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(2) > a > .bg-xMain').should('exist')
        /*cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(4) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\] > .text-white').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(6) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(8) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(10) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(12) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(14) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(16) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(18) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(18) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        ca
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(18) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')*/
        cy.xpath("//a").should('have.length', '11')


    })

    /*it('Contains Menu buttons', () => {
        cy.get('.btn').click()
        cy.get(':nth-child(1) > .justify-center > .h-auto > img').should('BE.VISIBLE')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(2) > a > .bg-xMain').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(4) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(6) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(8) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(10) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(12) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(14) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(16) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(18) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(18) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')
        cy.get(':nth-child(1) > .flex-1 > ul > :nth-child(18) > a > .hover\:bg-\[rgba\(255\,255\,255\,0\.05\)\]').should('exist')

    })*/

})