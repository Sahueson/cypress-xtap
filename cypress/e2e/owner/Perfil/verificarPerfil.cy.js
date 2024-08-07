describe('Login, navegar a Perfil y verificar perfil', () => {
    // Reemplaza con la URL de login de tu aplicación
    const loginUrl = 'https://portal-dev.x-tap.club/login';
    const url = 'https://portal-dev.x-tap.club/dashboard';
    const nombreEmpresaEsperada = 'Owner Test Comp';
    const direccionEsperada = 'C. Gloria Fuertes, 27, 45223 Seseña, Toledo, Spain';
    const nombreEsperado = 'OwnerTest';
    const apellidoEsperado = 'Ivan';
    const emailEsperado = 'antoniocabanillas92@gmail.com';
    const telefonoEsperado = '+34 652681715';
    const usuario = 'antoniocabanillas92@gmail.com';
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
        cy.get('.mt-8 > .mt-2 > :nth-child(1) > .flex').should('be.visible');
        cy.get('.mt-8 > .mt-2 > :nth-child(2) > .flex').should('be.visible');
        cy.get('.mt-4 > .mt-2 > :nth-child(1) > .flex').should('be.visible');
        cy.get('.mt-4 > .mt-2 > :nth-child(2) > .flex').should('be.visible');
        cy.get('.mt-2 > :nth-child(3) > .flex').should('be.visible');
        cy.get(':nth-child(4) > .flex').should('be.visible');


        // Verifica el valor del campo Nombre
        cy.get('.mt-8 > .mt-2 > :nth-child(1) > .flex').should('contain.text', nombreEmpresaEsperada);

        // Verifica el valor del campo Nombre
        cy.get('.mt-8 > .mt-2 > :nth-child(2) > .flex').should('contain.text', direccionEsperada);

        // Verifica el valor del campo Nombre
        cy.get('.mt-4 > .mt-2 > :nth-child(1) > .flex').should('contain.text', nombreEsperado);

        // Verifica el valor del campo Apellido
        cy.get('.mt-4 > .mt-2 > :nth-child(2) > .flex').should('contain.text', apellidoEsperado);

        // Verifica el valor del campo Email
        cy.get('.mt-2 > :nth-child(3) > .flex').should('contain.text', emailEsperado);

        // Verifica el valor del campo Teléfono
        cy.get(':nth-child(4) > .flex').should('contain.text', telefonoEsperado);
    });
});
