describe('Brand', () => {
  before(() => {
    cy.visit('tests/custom-elements/brand.html');
  });

  beforeEach(() => {
    ['brand-base-default', 'brand-inverse-sm', 'brand-white-md', 'brand-black-lg', 'brand-black-default', 'brand-white-xxl'].forEach((s) => {
      cy.get(`[data-cy=${s}]`, { timeout: 5000 })
        .should('have.class', 'hydrated')
        .children()
        .first()
        .should('match', 'a.a-brand')
        .as(s);
    });
  });

  it('Base brand should be included inside the custom element', () => {
    cy.get('@brand-base-default')
      .children()
      .first()
      .should('have.id', 'brand-base');
  });

  it('Inverse brand should be included inside the custom element', () => {
    cy.get('@brand-inverse-sm')
      .children()
      .first()
      .should('have.id', 'brand-inverse');
  });

  it('White brand should be included inside the custom element', () => {
    cy.get('@brand-white-md')
      .children()
      .first()
      .should('have.id', 'brand-white');
  });

  it('Black brand should be included inside the custom element', () => {
    cy.get('@brand-black-lg')
      .children()
      .first()
      .should('have.id', 'brand-black');
  });

  it('Brand should have default appropriate class for size', () => {
    cy.get('@brand-black-default')
      .and('not.have.class', '-md');
  });

  it('Sized brand should have appropriate class', () => {
    cy.get('@brand-white-xxl')
      .and('have.class', '-xxl');
  });
});
