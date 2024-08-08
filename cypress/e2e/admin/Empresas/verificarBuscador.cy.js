describe('Login, navegar a Empresas y verificar buscador funciona', () => {
    const loginUrl = 'https://portal-dev.x-tap.club/login';
    const empresasUrl = 'https://portal-dev.x-tap.club/dashboard/empresas';
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

    it('Debería navegar a Empresas, busca "OwnerTest" y verifica que aparece en la columna "Contacto', () => {
        // Haz clic en el botón de Empresas
        cy.contains('Empresas').click();

        // Verifica que estás en la página de Empresas
        cy.url().should('include', '/empresas');

        // Espera a que la tabla se actualice
        cy.wait(500); // Ajusta el tiempo si es necesario

        // Selecciona el primer campo de búsqueda usando eq(0)
        const searchTerm = "OwnerTest";
        cy.get('input[name="search"]').eq(0)
        .type(searchTerm, { force: true });
      

        // Espera a que la tabla se actualice
        cy.get('table tbody tr').should('exist'); // Asegura que al menos una fila esté presente

        // Selecciona la primera fila de la tabla y verifica el contenido de la tercera columna
        cy.get('table tbody tr').first()
          .find('td').eq(2)
          .should('contain.text', searchTerm);
    }); 
});