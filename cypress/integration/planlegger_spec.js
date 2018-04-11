describe('Inngangsvilkår', () => {
	it('Applikasjon starter', () => {
		cy.server();
		cy.visit('/foreldrepengeplanlegger');
		cy.contains('Foreldrepengeplanlegger');
	});
});
