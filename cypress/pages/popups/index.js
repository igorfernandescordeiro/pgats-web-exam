class Popups {

    irParaVerCarrinho(){
        cy.contains("View Cart").click()
        return this;
    }
};

export default new Popups()