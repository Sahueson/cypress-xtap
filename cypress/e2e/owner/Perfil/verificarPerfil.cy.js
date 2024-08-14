import LoginPage from "../../../PageObjects/LoginPage";

describe('Login, navegar a Perfil y verificar perfil', () => {

    before(() => {
        const loginComputer = new LoginPage();

        before(() => {
    
            loginComputer.LoginPage('ownerComputer');
    
        });
    
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

        cy.fixture('owner').then((data) => {
            // Verifica el valor del campo Nombre
            cy.get('.mt-8 > .mt-2 > :nth-child(1) > .flex').should('contain.text', data.nombreEmpresaOwnerEsperada);

            // Verifica el valor del campo Nombre
            cy.get('.mt-8 > .mt-2 > :nth-child(2) > .flex').should('contain.text', data.direccionOwnerEsperada);

            // Verifica el valor del campo Nombre
            cy.get('.mt-4 > .mt-2 > :nth-child(1) > .flex').should('contain.text', data.nombreOwnerEsperado);

            // Verifica el valor del campo Apellido
            cy.get('.mt-4 > .mt-2 > :nth-child(2) > .flex').should('contain.text', data.apellidoOwnerEsperado);

            // Verifica el valor del campo Email
            cy.get('.mt-2 > :nth-child(3) > .flex').should('contain.text', data.emailOwnerEsperado);

            // Verifica el valor del campo Teléfono
            cy.get(':nth-child(4) > .flex').should('contain.text', data.telefonoOwnerEsperado);
        })
    });
});
