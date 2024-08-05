class Home {

    clicarNoPrimeiroAdicionarAoCarrinho() {
        cy.contains("Add to cart")
            .click()
        return this;
    }
};

export default new Home()