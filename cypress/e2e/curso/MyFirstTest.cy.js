
describe('Visitar xtap y verificar title', () => {
    
    it('test1-verify title-positive', () => {
        cy.visit("https://portal-dev.x-tap.club/login")
        cy.title().should('eq','PORTAL X-TAP')
    })
        
    it('test2-verify title-negative', () => {
        cy.visit("https://portal-dev.x-tap.club/login")
        cy.title().should('eq','PORTAL X-TAP123')
    })
})