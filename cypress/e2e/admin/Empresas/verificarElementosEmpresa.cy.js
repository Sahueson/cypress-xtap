describe('Login, navegar a Empresas y verificar elementos', () => {
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

    it('Debería navegar a Empresas y verificar los elementos en la página', () => {
        // Haz clic en el botón de Empresas
        cy.contains('Empresas').click();

        // Verifica que estás en la página de Empresas
        cy.url().should('include', '/empresas');

        // Verifica que el botón "Añadir empresa" está visible
        cy.contains('Añadir empresa').should('be.visible');

        // Verifica que el campo de búsqueda está visible
        cy.get('input[placeholder="Buscar"]').should('be.visible');

        // Verifica que la tabla con los resultados está visible
        cy.get('table').should('be.visible');

        // Verifica que la tabla tiene 10 filas (excluyendo la fila de encabezado)
        cy.get('table tbody tr').should('have.length', 10);

        // Verifica los encabezados de la tabla
        const expectedHeaders = ['Nombre', 'ID', 'Contacto', 'Categoría', 'Reseñas', 'Paquete', 'Establecimientos', 'Fecha compra', 'Estado', ''];
        cy.get('table thead tr th').each((header, index) => {
            cy.wrap(header).should('contain.text', expectedHeaders[index]);
        });

        // Verifica el número de resultados mostrados
        cy.contains('Mostrando 1-10 de 22').should('be.visible');


        // Verifica los botones de paginación
        cy.get('.gap-1 > :nth-child(1)').find('svg').should('exist') // Verifica que el botón para retroceder al inicio está visible
        cy.get('.gap-1 > :nth-child(2)').find('svg').should('exist') // Verifica que el botón para retroceder está visible
        cy.get('.gap-1 > .bg-xMain').contains('1').should('be.visible'); // Verifica que la página 1 está activa
        cy.get('.gap-1 > :nth-child(4)').contains('2').should('be.visible'); // Verifica que la página 2 está visible
        cy.get('.gap-1 > :nth-child(5)').contains('3').should('be.visible'); // Verifica que la página 3 está visible
        cy.get('.gap-1 > :nth-child(6)').find('svg').should('exist') // Verifica que el botón para avanzar está visible
        cy.get('.gap-1 > :nth-child(7)').find('svg').should('exist') // Verifica que el botón para avanzar al final está visible
    });
});