import LoginPage from "../../../PageObjects/LoginPage";
import NewCompany from "../../../PageObjects/NewCompany"

describe('Login, navegar a Empresas y añadir una empresa', () => {
    const loginComputer = new LoginPage();
    const newCompany = new NewCompany();

    before(() => {

        loginComputer.LoginPage();

    });


    it('Debería navegar a Empresas, intentar añadir una empresa y dar KO', () => {

        const newCompanyData2 = newCompany.addCompanyWithOutRandomData();
        cy.wrap(newCompanyData2).as('newCompanyData2');

    });
});