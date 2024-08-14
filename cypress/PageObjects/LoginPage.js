class LoginPage {

    setViewport(viewport) {
        if (viewport === 'mobile') {
            cy.viewport('iphone-XR'); // Puedes cambiar a otro tamaño de dispositivo móvil
        } else if (viewport === 'desktop') {
            cy.viewport(1280, 720); // Resolución de escritorio común
        } else {
            cy.viewport(viewport.width, viewport.height); // Personalizado
        }
    }

    visit(url) {
        cy.visit(url);
    }

    fillUsername(username) {
        cy.get('#input-email').type(username);
    }

    fillPassword(password) {
        cy.get('#input-password').type(password);
    }

    submit() {
        cy.get('button[type="submit"]').click();
    }

    verifyLogin() {
        cy.url().should('include', '/dashboard');
    }

    waitDashboard() {
        cy.get('.min-h-screen > .h-full > .flex-1', { timeout: 10000 }).should('be.visible');
    }

    LoginPage(fixtureName = 'adminComputer') {
        cy.fixture(fixtureName).then((data) => {

            this.setViewport(data.viewport);
            this.visit(data.loginURL);
            this.fillUsername(data.usuario);
            this.fillPassword(data.contraseña);
            this.submit();
            this.verifyLogin();
            this.waitDashboard();
        })
    }
}

export default LoginPage;