/// <reference types="Cypress" />

describe('Buttons', () => {

  it('Base button should be included inside the custom element', () => {
    cy.visit('tests/custom-elements/buttons.html');

    cy.get('[data-cy="button"]')
      .wait(5000)
      .first()
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'button.a-btn');

  });

  it('Colored buttons should have appropriate class', () => {
    cy.get('[data-cy="button"]')
      .eq(1)
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'button.a-btn.-primary')
      .and('not.have.class', 'primary');

  });

  it('Sized buttons should have appropriate class', () => {
    cy.get('[size="xl"]')
      .first()
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'button.a-btn.-xl')
      .and('not.have.class', 'xl');
  });

  it('Icon buttons should have appropriate class', () => {
    cy.get('[type="icon"]')
      .first()
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'button.a-btn.-icon')
      .and('not.have.class', 'icon')
      .children()
      .first()
      .should('match', 'div.a-btn__content');
  });

  it('Close button should have appropriate class', () => {
    cy.get('[type="close"]')
      .first()
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'button.a-btn.-icon.-close')
      .and('not.have.class', 'close');
  });

});
