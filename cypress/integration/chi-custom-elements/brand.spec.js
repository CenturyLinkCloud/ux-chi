describe('Brand', () => {
  it('Base brand should be included inside the custom element', () => {
    cy.visit('tests/custom-elements/brand.html');

    cy.get('[data-cy="brand-base-default"]', { timeout: 5000 })
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'a.a-brand')
      .children()
      .first()
      .should('have.id', 'brand-base');
  });

  it('Inverse brand should be included inside the custom element', () => {
    cy.get('[data-cy="brand-inverse-sm"]', { timeout: 5000 })
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'a.a-brand')
      .children()
      .first()
      .should('have.id', 'brand-inverse');
  });

  it('White brand should be included inside the custom element', () => {
    cy.get('[data-cy="brand-white-md"]', { timeout: 5000 })
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'a.a-brand')
      .children()
      .first()
      .should('have.id', 'brand-white');
  });

  it('Black brand should be included inside the custom element', () => {
    cy.get('[data-cy="brand-black-lg"]', { timeout: 5000 })
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'a.a-brand')
      .children()
      .first()
      .should('have.id', 'brand-black');
  });

  it('Brand should have default appropriate class for size', () => {
    cy.get('[data-cy="brand-black-default"]', { timeout: 5000 })
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'a.a-brand')
      .and('not.have.class', '-md');
  });

  it('Sized brand should have appropriate class', () => {
    cy.get('[data-cy="brand-white-xxl"]', { timeout: 5000 })
      .should('have.class', 'hydrated')
      .children()
      .first()
      .should('match', 'a.a-brand.-xxl')
      .and('not.have.class', 'xxl');
  });
});
