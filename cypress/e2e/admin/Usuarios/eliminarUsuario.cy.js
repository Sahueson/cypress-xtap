import LoginPage from "../../../PageObjects/LoginPage";
import SearchInTable from "../../../PageObjects/SearchInTable";

describe('Login, navegar a Usuarios y eliminar un usuario', () => {
    const loginComputer = new LoginPage();
    const newSearch = new SearchInTable();

    beforeEach(() => {

        loginComputer.LoginPage();

    });

    it('Debería navegar a Usuarios, buscar al ultimo owner creado y eliminarlo', () => {

        cy.fixture('userRandomCompanyModify').then((data) => {
            newSearch.findAndClickActionButton('Usuarios', data.nombre)
        })
        cy.get('.justify-between > .px-8').click();
        cy.get('.mb-8 > .fixed > .bg-white > :nth-child(2) > :nth-child(1) > .flex > .text-white').click();
    });
    it('Debería verificar que el usuario ha sido eliminado', () => {
        cy.fixture('userRandomCompanyModify').then((data) => {
            // Navega a la sección de usuarios
            newSearch.findAndClickActionButton('Usuarios', data.nombre);

            // Verifica que el usuario no aparece en la lista
            cy.contains(data.nombre).should('not.exist');
        });
    });
});