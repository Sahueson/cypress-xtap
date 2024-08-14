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
        cy.get('#input-firstName').should('be.visible');
        cy.get('#input-lastName').should('be.visible');
        cy.get('#input-email').should('be.visible');
        cy.get('#input-phone').should('be.visible');


        cy.fixture('managerComputer').then((data) => {
        // Verifica el valor del campo Nombre
        cy.get('#input-firstName').should('have.value', data.nombreManagerEsperado);

        // Verifica el valor del campo Apellido
        cy.get('#input-lastName').should('have.value', data.apellidoManagerEsperado);

        // Verifica el valor del campo Email
        cy.get('#input-email').should('have.value', data.emailManagerEsperado);

        // Verifica el valor del campo Teléfono
        cy.get('#input-phone').should('have.value', data.telefonoManagerEsperado);

        })
    });
});
