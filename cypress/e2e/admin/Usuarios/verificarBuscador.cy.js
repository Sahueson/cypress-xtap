import LoginPage from "../../../PageObjects/LoginPage";
import SearchAndVerify from '../../../PageObjects/SearchAndVerify';

describe('Login, navegar a Usuarios y verificar buscador funciona', () => {
    const loginComputer = new LoginPage();
    const searchAndVerify = new SearchAndVerify();

    before(() => {

        loginComputer.LoginPage();

    });

    it('Debería navegar a Usuarios, busca "Owner" y verifica que aparece', () => {
        
        const expectedData = [
            { Nombre: 'OwnerTest Ivan', Perfil: 'Empresa', Empresa: '-----', Establecimiento: '-----', Email: 'antoniocabanillas92@gmail.com', Teléfono: '+34 652681715', Estado: 'Activo', Lapiz: ''}
        ];

        searchAndVerify.searchAndVerify('Usuarios', 'Owner', expectedData);

    });
});