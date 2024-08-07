describe('Login, navegar a Perfil y verificar perfil', () => {
    // Reemplaza con la URL de login de tu aplicación
    const loginUrl = 'https://portal-dev.x-tap.club/login';
    const url = 'https://portal-dev.x-tap.club/dashboard';
    const nombreEsperado = 'AdminTest';
    const apellidoEsperado = 'Ivan';
    const emailEsperado = 'ivan.c@alphaxperience.io';
    const telefonoEsperado = '652681716';
    const usuario = 'ivan.c@alphaxperience.io';
    const contraseña = 'xtap123';

    before(() => {

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

    it('Debería navegar a Perfil y verificar los valores de los campos de perfil', () => {

        // Haz clic en el botón de Perfil
        cy.contains('Perfil').click();

        // Verifica que estás en la página de Perfil
        cy.url().should('include', '/perfil');

        // Espera a que los campos de perfil estén visibles
        cy.get('#input-firstName').should('be.visible');
        cy.get('#input-lastName').should('be.visible');
        cy.get('#input-email').should('be.visible');
        cy.get('#input-phone').should('be.visible');

        // Verifica el valor del campo Nombre
        cy.get('#input-firstName').should('have.value', nombreEsperado);

        // Verifica el valor del campo Apellido
        cy.get('#input-lastName').should('have.value', apellidoEsperado);

        // Verifica el valor del campo Email
        cy.get('#input-email').should('have.value', emailEsperado);

        // Verifica el valor del campo Teléfono
        cy.get('#input-phone').should('have.value', telefonoEsperado);
    });
});
