import LoginPage from "../../../PageObjects/LoginPage";
import SearchAndVerify from '../../../PageObjects/SearchAndVerify';

describe('Login, navegar a Clientes y verificar buscador funciona', () => {
    const loginComputer = new LoginPage();
    const searchAndVerify = new SearchAndVerify();

    before(() => {

        loginComputer.LoginPage();

    });

    it('Debería navegar a Clientes, busca "testivan" y verifica que aparece', () => {
        
        const expectedData = [
            { Nombre: 'test ', ID: '9', Email: 'testivan2@alphaxperience.io', Teléfono: '+34 611223344', Reseñas: '3', FirstReview: '19/07/2024', Estado: 'Activo', ojo: '' }
        ];

        searchAndVerify.searchAndVerify('Clientes', 'testivan', expectedData);

    });
});