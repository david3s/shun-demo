it('should open page', () => {
  cy.visit('http://localhost:3000');
  cy.findAllByText('Shun Demo').should('exist');
  cy.findAllByText(/david allan \- 75 \- 215 \- 2004\-04\-06 \- denver \- co/i).should('be.visible');
  cy.get('[style="position: relative; height: 600px; width: 800px; overflow: auto; will-change: transform; direction: ltr;"]')
    .scrollTo('bottom');
  cy.findAllByText(/david allan \- 75 \- 215 \- 2004\-04\-06 \- denver \- co/i).should('not.be.visible');

})