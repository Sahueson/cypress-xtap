import LoginPage from "../../../PageObjects/LoginPage";
import SearchAndVerify from '../../../PageObjects/SearchAndVerify';

describe('Login, navegar a Paquetes y verificar buscador funciona', () => {
    const loginComputer = new LoginPage();
    const searchAndVerify = new SearchAndVerify();

    before(() => {

        loginComputer.LoginPage();

    });

    it('Debería navegar a Paquetes, busca "OwnerTest" y verifica que aparece en la columna "Contacto', () => {
        
        const expectedData = [
            { Nombre: 'Pack 2', Bonus: '-----', Productos: 'card, stand', Cantidad: '10 card + 10 stand', Precio: '29.99', FechaCreacion: '-----', Estado: 'Activo', ojo: '' },
            { Nombre: 'Pack 2', Bonus: '-----', Productos: 'card, stand', Cantidad: '10 card + 10 stand', Precio: '19.99', FechaCreacion: '-----', Estado: 'Bloqueada', ojo: '' }
        ];

        searchAndVerify.searchAndVerify('Paquetes', 'Pack 2', expectedData);

    });
});