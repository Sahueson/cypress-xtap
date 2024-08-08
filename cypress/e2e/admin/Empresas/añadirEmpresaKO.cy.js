describe('Login, navegar a Empresas y añadir una empresa', () => {
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

    it('Debería navegar a Empresas y añadir una empresa', () => {

        const nombreEmpresa = 'NombreEmpresaCypress';
        const direccionEsperada = 'C. Gloria Fuertes, 27, 45223 Seseña, Toledo, Spain';
        const statusIdActive = 0;
        const statusIdBlocked = 1;
        const nombreUser = 'TestCypress';
        const apellidoUser = 'apellidoCypress';
        const phoneUser = '652681716';
        const emailUser = 'ivan.c@alphaxperience.io';


        // Haz clic en el botón de Empresas
        cy.contains('Empresas').click();

        // Verifica que estás en la página de Empresas
        cy.url().should('include', '/empresas');

        // Verifica que el botón "Añadir empresa" está visible
        cy.contains('Añadir empresa').should('be.visible').click();

        cy.get('#input-company').type(nombreEmpresa);
        cy.get('#input-address').type(direccionEsperada);
        cy.wait(1000);
        cy.get('.py-2').click();
        cy.get('#select-statusId').select(statusIdBlocked);
        cy.get('#input-firstName').type(nombreUser);
        cy.get('#input-lastName').type(apellidoUser);
        cy.get('#input-email').type(emailUser);
        cy.get('[data-testid="rfs-btn"]').click();
        cy.get('.ReactFlagsSelect-module_selectOptions__3LNBJ').contains('+34').click();
        cy.get('#input-phone').type(phoneUser);
        cy.get('.text-black').click();
    });
});