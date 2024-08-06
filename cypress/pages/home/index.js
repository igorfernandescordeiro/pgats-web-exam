class Home {

    clicarNoPrimeiroAdicionarAoCarrinho() {
        cy.contains("Add to cart")
            .click()
        return this;
    }
    informarEmailNoCampoSubscription(email) {
        cy.get('input#susbscribe_email')
            .scrollIntoView()
            .type(email)
        return this;
    }

    clicarNoBotaoSubscription() {
        cy.get('button#subscribe').click()
        return this;
    }
};

export default new Home()