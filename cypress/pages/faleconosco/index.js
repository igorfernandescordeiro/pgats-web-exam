class FaleConosco {

    preencherFormulario(nome, email, assunto, mensagem) {
        cy.get('[data-qa="name"]')
            .type(nome)
        cy.get('[data-qa="email"]')
            .type(email)
        cy.get('[data-qa="subject"]')
            .type(assunto)
        cy.get('[data-qa="message"]')
            .type(mensagem)
        return this;
    }

    enviarArquivo() {
        cy.fixture('example.json')
            .as('arquivo')
        cy.get('input[name="upload_file"]')
            .selectFile('@arquivo')
        return this;
    }

    clicarEmEnviar() {
        cy.get('[data-qa="submit-button"]')
            .click()
        return this;
    }
};

export default new FaleConosco()