class Menu {
    irParaProdutos() {
        cy.contains(`Products`)
            .click()
        return this;
    }

    irParaCadastro() {
        cy.contains(`Signup`)
            .click()
        return this;
    }

    irParaEntreEmContato() {
        cy.contains(`Contact us`)
            .click()
        return this;
    }

    clicarEmDeletarConta() {
        cy.get('[href *="delete"]')
            .click()
        return this;
    }

    clicarEmLogout() {
        cy.contains('Logout')
            .click()
        return this;
    }
};

export default new Menu()