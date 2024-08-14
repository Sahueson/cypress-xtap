import LoginPage from "../../../PageObjects/LoginPage";
import NewCompany from "../../../PageObjects/NewCompany"
import Search from "../../../PageObjects/Search";

describe('Login, navegar a Empresas y añadir una empresa', () => {
    const loginComputer = new LoginPage();
    const newCompany = new NewCompany();
    const newSearch = new Search();

    beforeEach(() => {

        loginComputer.LoginPage();

    });


    it('Debería navegar a Empresas y añadir una empresa', () => {

        const newCompanyData = newCompany.addCompanyWithRandomData();
        cy.wrap(newCompanyData).as('newCompanyData');

    });

    it('Revisar que se creo la empresa', () => {
        cy.fixture('addedRandomCompany').then((data) => {
            newSearch.searchAndVerifyResults('Empresas', data.firstName)
        })

    });
});