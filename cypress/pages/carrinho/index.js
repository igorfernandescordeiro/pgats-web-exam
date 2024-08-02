class Carrinho {

    irParaCheckout() {
        cy.get('.btn-default.check_out').should('be.visible')
        cy.get('.btn-default.check_out').click()
        return this;
    }
};

export default new Carrinho()