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
        cy.wait(1000); // Ajusta el tiempo si es necesario

        cy.get('tbody > tr > :nth-child(10)').click();

        cy.wait(1000);

        // Verifica los encabezados de la tabla
        const expectedHeaders = ['Nombre', 'ID', 'Contact', 'Categoría', 'Reseñas', 'Productos', 'Fecha Compra', 'Empleados', ''];
        cy.get('table thead tr th').each((header, index) => {
            cy.wrap(header).should('contain.text', expectedHeaders[index]);
        });

        // Define los datos esperados para cada fila
        const expectedData = [
            { Nombre: 'Est Uno', ID: '12', Contact: 'OwnerTest', Categoría: 'Restaurante', Reseñas: '4', Productos: '', FechaCompra: '05/07/24', Empleados: '----' },
            { Nombre: 'Test Ivan2', ID: '8', Contact: 'OwnerTest', Categoría: 'Restaurante', Reseñas: '442', Productos: '', FechaCompra: '26/06/24', Empleados: '----' },
            { Nombre: 'test test test', ID: '6', Contact: 'OwnerTest', Categoría: 'Hotel', Reseñas: '348', Productos: '', FechaCompra: '20/06/24', Empleados: '----' }
        ];

        // Cuenta cuántas filas hay en la tabla
        cy.get('table thead tr th').then($rows => {
            const rowCount = $rows.length;

            // Asegúrate de que hay suficientes datos en `expectedData`
            if (rowCount < expectedData.length) {
                throw new Error(`No hay suficientes datos esperados para verificar todas las filas. Filas en la tabla: ${rowCount}, Datos disponibles: ${expectedData.length}`);
            }

            // Selecciona todas las filas del cuerpo de la tabla
            cy.get('table tbody tr').each((row, index) => {
                // Verifica cada celda de la fila contra los datos esperados



                const expectedRow = expectedData[index];

                cy.wrap(row).find('td').eq(0).should('have.text', expectedRow.Nombre);
                cy.wrap(row).find('td').eq(1).should('have.text', expectedRow.ID);
                cy.wrap(row).find('td').eq(2).should('have.text', expectedRow.Contact);
                cy.wrap(row).find('td').eq(3).should('have.text', expectedRow.Categoría);
                cy.wrap(row).find('td').eq(4).should('have.text', expectedRow.Reseñas);
                cy.wrap(row).find('td').eq(5).should('have.text', expectedRow.Productos);
                cy.wrap(row).find('td').eq(6).should('have.text', expectedRow.FechaCompra);
                cy.wrap(row).find('td').eq(7).should('have.text', expectedRow.Empleados);

            });
        });

        // Revisar paquetes
        cy.get('.p-8 > :nth-child(3) > :nth-child(1) > .gap-4 > :nth-child(2)').click();
        cy.wait(1000);
        cy.get('.mt-2 > :nth-child(1) > .flex > .text-xBlack').should('contain.text', 'Paquetes');

        // Revisar productos
        cy.get('.gap-4 > :nth-child(3)').click();
        cy.wait(1000);
        cy.get('.mt-2 > :nth-child(1) > .flex > .text-xBlack').should('contain.text', 'Productos');

        // Revisar informacion
        cy.get('.w-full > :nth-child(4)').click();
        cy.wait(1000);

        const nombreEmpresaEsperada = 'Owner Test Comp';
        const direccionEsperada = 'C. Gloria Fuertes, 27, 45223 Seseña, Toledo, Spain';
        const nombreEsperado = 'OwnerTest';
        const apellidoEsperado = 'Ivan';
        const emailEsperado = 'antoniocabanillas92@gmail.com';
        const telefonoEsperado = '652681715';

        // Verifica el valor del campo Nombre
        cy.get('#input-company').should('have.value', nombreEmpresaEsperada);

        // Verifica el valor del campo Nombre
        cy.get('#input-address').should('have.value', direccionEsperada);

        // Verifica el status
        cy.get('#select-statusId').should('have.value', '1')

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