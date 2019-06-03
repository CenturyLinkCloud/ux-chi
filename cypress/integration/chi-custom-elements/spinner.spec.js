/// <reference types="Cypress" />

describe('Spinner', () => {

  it('Spinner should be included inside the custom element', () => {
    cy.visit('tests/custom-elements/spinner.html');

    cy.get('chi-spinner')
      .last()
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'svg');
  });

  it('Setting backdrop on spinner should have appropriate class', () => {
    cy.get('chi-spinner')
      .first()
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'div.a-backdrop')
      .and('not.have.class', 'a-spinner');
  });

  it('Setting backdrop to inverse should have appropriate class', () => {
    cy.get('chi-spinner')
      .first()
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'div.a-backdrop.-inverse')
      .and('not.have.class', 'a-spinner');
  });

  it('Colored spinner should have appropriate class', () => {
    cy.get('[id="spinner-color"]')
      .eq(1)
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'svg.a-spinner.-text--success')
      .and('not.have.class', 'success');
  });

  it('Sized spinner should have appropriate class', () => {
    cy.get('[id="spinner-size"]')
      .first()
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'svg.a-spinner.-xs')
      .and('not.have.class', 'xs');
  });

});
