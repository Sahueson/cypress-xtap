import LoginPage from "../../../PageObjects/LoginPage";
import SearchAndVerify from '../../../PageObjects/SearchAndVerify';

describe('Login, navegar a Empresas y verificar buscador funciona', () => {
    const loginComputer = new LoginPage();
    const searchAndVerify = new SearchAndVerify();

    before(() => {

        loginComputer.LoginPage();

    });

    it('Debería navegar a Empresas, busca "OwnerTest" y verifica que aparece', () => {
        
        const expectedData = [
            { Nombre: 'Owner Test Comp', ID: '2', Contacto: 'OwnerTest Ivan', Categoría: '', Reseñas: '', Paquete: '', Establecimientos: '', FechaCompra: '2024-06-20', Estado: 'Activo', ojo: '' }
        ];

        searchAndVerify.searchAndVerify('Empresas', 'OwnerTest', expectedData);

    });
});