import LoginPage from "../../../PageObjects/LoginPage";
import Search from "../../../PageObjects/Search"

describe('Login, navegar a Empresas y verificar buscador funciona', () => {
    const loginComputer = new LoginPage();
    const newSearch = new Search();

    before(() => {

        loginComputer.LoginPage();

    });

    it('Debería navegar a Empresas, busca "OwnerTest" y verifica que aparece en la columna "Contacto', () => {

        newSearch.searchAndVerifyResults('Empresas', 'OwnerTest')

        cy.get('tbody > tr > :nth-child(10)').click();

        cy.wait(1000);

        // Verifica los encabezados de la tabla
        const expectedHeaders = ['Nombre', 'ID', 'Contact', 'Categoría', 'Reseñas', 'Productos', 'Fecha Compra', 'Empleados', ''];
        cy.get('table thead tr th').each((header, index) => {
            cy.wrap(header).should('contain.text', expectedHeaders[index]);
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
        cy.fixture('adminComputer').then((data) => {

            // Verifica el valor del campo Nombre
            cy.get('#input-company').should('have.value', data.nombreEmpresaOwnerEsperada);

            // Verifica el valor del campo Nombre
            cy.get('#input-address').should('have.value', data.direccionOwnerEsperada);

            // Verifica el status
            cy.get('#select-statusId').should('have.value', '1')

            // Verifica el valor del campo Nombre
            cy.get('#input-firstName').should('have.value', data.nombreOwnerEsperado);

            // Verifica el valor del campo Apellido
            cy.get('#input-lastName').should('have.value', data.apellidoOwnerEsperado);

            // Verifica el valor del campo Email
            cy.get('#input-email').should('have.value', data.emailOwnerEsperado);

            // Verifica el valor del campo Teléfono
            cy.get('#input-phone').should('have.value', data.telefonoOwnerEsperado);
        })

        });


    });