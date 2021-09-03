it('should open page', () => {
  cy.visit('http://localhost:3000');
  cy.findByText('John Doe').should('exist');
})