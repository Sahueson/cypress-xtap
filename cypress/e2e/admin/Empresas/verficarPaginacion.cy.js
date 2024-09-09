import LoginPage from "../../../PageObjects/LoginPage";

describe('Login, navegar a Empresas y verificar que la paginacion funciona', () => {
    const loginComputer = new LoginPage();

    before(() => {

        loginComputer.LoginPage();

    });

    it('Debería navegar a Empresas, verificar y usar la paginación', () => {
        // Haz clic en el botón de Empresas
        cy.contains('Empresas').click();
    
        // Verifica que estás en la página de Empresas
        cy.url().should('include', '/empresas');
    

    
        cy.get('.gap-1 > .bg-xMain').contains('1').should('be.visible'); // Verifica que la página 1 está activa
        cy.get('.gap-1 > :nth-child(4)').contains('2').should('be.visible'); // Verifica que la página 2 está visible
        cy.get('.gap-1 > :nth-child(5)').contains('3').should('be.visible'); // Verifica que la página 3 está visible
        cy.get('.gap-1 > :nth-child(6)').contains('4').should('be.visible'); // Verifica que la página 4 está visible
    
         // Verifica que haya 10 filas
        cy.get('table tbody tr').should('have.length', 10);
    
        // Verifica y haz clic en el botón de la siguiente página
        cy.get('.gap-1 > :nth-child(7)').find('svg')
          .scrollIntoView()
          .should('be.visible', { timeout: 10000 })
          .and('not.be.disabled')
          .click();
    
        // Verifica nuevamente la tabla
        cy.get('table tbody tr').should('have.length', 10);
    
        // Obtener el texto que muestra el rango de filas y el total
        cy.get('.text-xGrayV2') // Asegúrate de que esta clase corresponde al elemento que muestra el texto "Mostrando 1-10 de X"
            .invoke('text')
            .then((text) => {
                const match = text.match(/Mostrando \d+-\d+ de (\d+)/);

                // Extraer el total de elementos
                const total = parseInt(match[1]);

                // Calcular el número de filas que debería haber en la última página
                const rowsInLastPage = total % 10 || 10;

                // Navegar a la última página usando el botón ">>"
                cy.get('.gap-1 > :nth-child(8)').find('svg').scrollIntoView().click();

                // Verificar el número de filas en la última página
                cy.get('table tbody tr').should('have.length', rowsInLastPage);
            });
    
        // Regresa a la primera página
        cy.get('.gap-1 > :nth-child(1)').find('svg')
          .scrollIntoView()
          .should('be.visible')
          .and('not.be.disabled')
          .click();
        
        // Verifica que la tabla vuelva a tener los elementos de la primera página
        cy.get('table tbody tr').should('have.length', 10);
    });
    
});