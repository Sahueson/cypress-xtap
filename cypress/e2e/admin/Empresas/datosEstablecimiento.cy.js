import LoginPage from "../../../PageObjects/LoginPage";
import SearchAndVerify from "../../../PageObjects/SearchAndVerify";

describe('Login, navegar a Empresas, encontrar un owner y revisar un establecimiento', () => {
    const loginComputer = new LoginPage();
    const newSearch = new SearchAndVerify();

    before(() => {

        loginComputer.LoginPage();

    });

    it('Debería navegar a Empresas, busca "OwnerTest", encontrar un establecimento y verificar los datos', () => {

        newSearch.searchAndOpenOwnerById('Empresas', 'OwnerTest', '2');
        newSearch.searchAndOpenCommerceById('4');


        });


    });