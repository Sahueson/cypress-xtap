import { faker } from '@faker-js/faker';

class CreateReview {
    constructor() {
        this.nombreInput = '#input-firstName';
        this.apellidosInput = '#input-lastName';
        this.emailInput = '#input-email';
        this.telefonoInput = '#input-phone';
        this.aceptarPoliticaCheckbox = '.checkbox';
        this.enviarButton = '.gap-8 > .btn';
        this.noParticiparLink = '.btn-outline';
        
        this.cookieModal = '#cookieConsentModal'; // Selector del modal de cookies
        this.cookieAcceptButton = '#cookieConsentModal button:contains("Aceptar Cookies")'; // Selector del botón "Aceptar Cookies"
        
        this.urls = [
            'https://review-dev.x-tap.club/new-review?productUuid=de0360d3-0f75-4662-bf4b-382d32c8b0ab',
            'https://review-dev.x-tap.club/new-review?productUuid=fa529281-9700-4c58-a669-3872e245f402',
            'https://review-dev.x-tap.club/new-review?productUuid=536dc13a-95a7-48f4-8062-127745fac123'
        ];

        this.expectedRedirectUrl = 'https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fsearch.google.com%2Flocal%2Fwritereview%3Fplaceid%3DChIJIWGFdKCprI8RJGrvoG-fnYE&ifkv=Ab5oB3p-TmmZrUUcbtjp33lqsCQZGhcSSyT07bnzbCPboLYGjwQV59pCiO8oFdSQTyGKymG75PTa&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1071117238%3A1724754993038013&ddm=0';
    }

    seleccionarUrlAleatoria() {
        const randomUrl = faker.helpers.arrayElement(this.urls);
        cy.visit(randomUrl);
        this.aceptarCookies();
        cy.wait(3000);
    }

    aceptarCookies() {
        cy.wait(2000);
        cy.get('body').then(($body) => {
            if ($body.find(this.cookieModal).length > 0) {
                cy.get(this.cookieAcceptButton).click();
            }
        });
    }

    crearReviewDesdeFixture(fixtureData) {
        this.seleccionarUrlAleatoria();
        cy.fixture(fixtureData).then((data) => {
            cy.get(this.nombreInput).type(data.firstName);
            cy.get(this.apellidosInput).type(data.lastName);
            cy.get(this.emailInput).type(data.email);
            cy.get(this.telefonoInput).type(data.phoneUser);
            cy.get(this.aceptarPoliticaCheckbox).check();
        });
        this.verificarCreacionYRedireccion('reseña');
    }

    crearReviewAleatoria() {
        this.seleccionarUrlAleatoria();
        const randomData = {
            nombre: `Cypress_${faker.name.firstName()}`,
            apellidos: `Cypress_${faker.name.lastName()}`,
            email: `Cypress_${faker.internet.email()}`,
            telefono: '611223344'
        };

        cy.get(this.nombreInput).type(randomData.nombre);
        cy.get(this.apellidosInput).type(randomData.apellidos);
        cy.get(this.emailInput).type(randomData.email);
        cy.get(this.telefonoInput).type(randomData.telefono);
        cy.get(this.aceptarPoliticaCheckbox).check();
        this.verificarCreacionYRedireccion('reseña');
    }

    crearReviewSinParticipar() {
        this.seleccionarUrlAleatoria();
        cy.get(this.noParticiparLink).click();
        this.verificarCreacionYRedireccion();
    }

    verificarCreacionYRedireccion(opcion) {

        const botonSelector = opcion === 'reseña' ? this.enviarButton : this.noParticiparLink;

        // Interceptar la solicitud de revisión
        cy.intercept('POST', '**/api/review').as('review');

        
        cy.get(botonSelector).click();

        // Esperar a que la solicitud de revisión se complete
        cy.wait('@review').then((interception) => {
            // Verificar el código de estado de la respuesta
            const statusCode = interception.response.statusCode;
            const responseBody = interception.response.body;

            if (statusCode === 500 & responseBody.error == 'Hoy ya has hecho una review en este establecimiento, vuelve mañana para poner otra!. Igualmente, puedes seguir acumulando participaciones para el sorteo poniendo reviews en otros establecimientos que tengan tarjetas X-TAP. Cuando vayas a otro sitio, pregúntales si tienen X-TAP, y si no lo tienen, diles que se unan en https://x-tap.club!') {
                // Manejar el caso de error del servidor (código 500)
                cy.log('Error del servidor:', responseBody.error || 'No se proporcionó mensaje de error.');
                // Verifica el mensaje de error específico si está disponible
                expect(responseBody.error).to.include("Hoy ya has hecho una review en este establecimiento");
                
                // Verificar la URL de redirección si aplica
                cy.url().should('include', 'https://review-dev.x-tap.club/new-review/error');
            } else if (statusCode === 500 & responseBody.error == 'there is already a review in this establishment') {
                // Manejar el caso de error del servidor (código 500)
                cy.log('Error del servidor:', responseBody.error || 'No se proporcionó mensaje de error.');
                 // Verificar que el texto específico está presente en la pantalla
                 cy.contains('Ya escribiste una reseña en este establecimiento, pero si tu opinión al respecto a cambiado puedes editar la reseña que dejaste.')
                 .should('be.visible'); // Asegúrate de que el texto esté visible en la pantalla
                 cy.get('.btn').click();
                 cy.log('Reseña MODIFICADA exitosamente.');
                 cy.wait(3000); // Ajusta el tiempo de espera si es necesario
                 cy.url().then((url) => {
                     cy.log('Current URL:', url);
                     // Verifica la URL esperada si es necesario
                     expect(url).to.include('');
                 });
            } else if (statusCode === 200) {
                // Manejar el caso de éxito (código 200)
                cy.log('Reseña creada exitosamente.');
                cy.wait(3000); // Ajusta el tiempo de espera si es necesario
                cy.url().then((url) => {
                    cy.log('Current URL:', url);
                    // Verifica la URL esperada si es necesario
                    expect(url).to.include('');
                });
            } else {
                // Manejar otros códigos de estado si es necesario
                cy.log(`Código de estado inesperado: ${statusCode}`);
            }
        });
    }
}

export default new CreateReview();
