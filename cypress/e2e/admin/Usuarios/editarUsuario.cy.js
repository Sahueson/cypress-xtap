import LoginPage from "../../../PageObjects/LoginPage";
import SearchInTable from "../../../PageObjects/SearchInTable";
import DetailsEdit from "../../../PageObjects/DetailsEdit";
import randomData from "../../../PageObjects/randomData";

describe('Login, navegar a Usuarios y editar un usuario', () => {
    const loginComputer = new LoginPage();
    const newSearch = new SearchInTable();
    const newData = randomData.generarUsuario();

    before(() => {

        loginComputer.LoginPage();

    });

    it('Debería navegar a Usuarios, buscar al ultimo owner creado y editar los campos', () => {

        cy.fixture('addedRandomCompany').then((data) => {
            newSearch.findAndClickActionButton('Usuarios', data.firstName)
            DetailsEdit.modificarUsuario(newData);
        })

        cy.readFile('cypress/fixtures/userRandomCompanyModify.json').then((data) => {
            expect(data).to.deep.equal(newData);
        });

    });
});