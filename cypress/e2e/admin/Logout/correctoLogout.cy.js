import LoginPage from "../../../PageObjects/LoginPage";

describe("Login y logout correctamente", function () {
    const loginComputer = new LoginPage();

    before(() => {

        loginComputer.LoginPage();

    });

    it("Deberia hacer click en logout y cancel, siguiendo logeado", function () {

        cy.contains('Logout').click();

        // Hacer click en el boton cancelar
        cy.get('.btn-outline').click();

        // Espera a que algún elemento específico del dashboard se cargue
        cy.get('.min-h-screen > .h-full > .flex-1', { timeout: 10000 }).should('be.visible');


    });

    it('Deberia hacer click en logout y cerrar sesion', () => {

        cy.contains('Logout').click();

        // Hacemos click en cerrar sesion
        cy.get('.w-full > .bg-xMain').click()

        // Deberia haber cerrado sesion y verificamos que estamos fuera
        cy.url().should('contains', loginUrl);

    });
});