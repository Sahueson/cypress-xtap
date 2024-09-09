import LoginPage from "../../../PageObjects/LoginPage";
import SearchAndVerify from "../../../PageObjects/SearchAndVerify";
import ElementOwner from "../../../PageObjects/ElementOwner";

describe('Login, navegar a Empresas y verificar datos empresa', () => {
    const loginComputer = new LoginPage();
    const newSearch = new SearchAndVerify();

    before(() => {

        loginComputer.LoginPage();

    });

    it('Debería navegar a Empresas, busca "OwnerTest" y verifica que aparece en la columna "Contacto', () => {

        newSearch.searchAndOpenOwnerById('Empresas', 'OwnerTest', '2');
        ElementOwner.revisarTodo('adminComputer')


        });


    });