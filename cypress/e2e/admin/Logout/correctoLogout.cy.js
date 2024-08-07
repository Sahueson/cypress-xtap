describe("Login y logout correctamente", function () {

    const loginUrl = 'https://portal-dev.x-tap.club/login';
    const usuario = 'ivan.c@alphaxperience.io';
    const contraseña = 'xtap123';

    beforeEach(() => {

        // Configura el tamaño de la ventana del navegador
        cy.viewport(1280, 720);

        // Limpia las cookies antes de cada prueba
        cy.clearCookies();

        // Visita la URL de login
        cy.visit(loginUrl);

        // Completa los campos de login y envía el formulario
        cy.get('#input-email').type(usuario);
        cy.get('#input-password').type(contraseña);
        cy.get('button[type="submit"]').click();

        // Espera a que la URL cambie al dashboard
        cy.url().should('include', '/dashboard');

        // Espera a que algún elemento específico del dashboard se cargue
        cy.get('.min-h-screen > .h-full > .flex-1', { timeout: 10000 }).should('be.visible');

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