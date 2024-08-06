class Produtos {

    informarProduto(produto) {
        cy.get('input#search_product')
            .type(produto)
        return this;
    }
    pesquisarProduto() {
        cy.get('button#submit_search')
            .click()
        return this;
    }
    verDetalhePrimeiroProduto() {
        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
            .first()
            .parent()
            .contains('View Product')
            .click()
        return this;
    }
};

export default new Produtos()