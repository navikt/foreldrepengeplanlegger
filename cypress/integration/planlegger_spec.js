describe('Foreldrepengeplanlegger', () => {
	const forelder1 = 'Mona Lisa';
	const forelder2 = 'Fader Jacob';
	const defaultForelder1 = 'Mor';
	const defaultForelder2 = 'Far eller medmor';

	const termindato = '11.04.2018';
	const arbeidPeriode = {
		start: '10.08.2018',
		slutt: '16.08.2018'
	};

	it('Applikasjon starter', () => {
		cy.server();
		cy.visit('/foreldrepengeplanlegger');
		cy.contains('Foreldrepengeplanlegger');
		cy.get('.utvidetInformasjon__toggler .infoToggler').click();
		cy.get('*[data-ref="veileder.forbehold.utvidetinfo.html"]');
	});

	describe('Skjema', () => {
		it('Godtar utfylling av navn og termindato', () => {
			cy.get('input[name="navnforelder1"]').type(forelder1);
			cy.get('input[name="navnforelder2"]').type(forelder2);
			cy
				.get('#input-termindato')
				.type(termindato)
				.blur();
		});
		it('fyller ut dekningsgrad', () => {
			cy.get('input[data-ref="dekningsgrad_80%"]').click();
			cy.get('input[data-ref="dekningsgrad_100%"]').click();
		});
		it('kan velge fordeling av fellesperiode', () => {
			cy.get('input.nav-frontend-range-input');
			cy.get('.rangeInput__stepper--previous button').click();
			cy.get('.rangeInput__stepper--next button').click();
		});
		it('kan vise tidslinje', () => {
			cy.get('button[type="submit"]').click();
		});
	});

	describe('Tidslinje', () => {
		it('Viser tidslinjenn', () => {
			cy.get('button[data-ref="leggTilKnapp"]');
		});
		it('viser riktige navn', () => {
			cy.get('.fordeling__header__forelder:nth-child(1)').contains(forelder1);
			cy.get('.fordeling__header__forelder:nth-child(2)').contains(forelder2);
		});
		it('viser riktige default navn dersom navn tømmes', () => {
			cy.get('input[name="navnforelder1"]').clear();
			cy.get('input[name="navnforelder2"]').clear();
			cy
				.get('.fordeling__header__forelder:nth-child(1)')
				.contains(defaultForelder1);
			cy
				.get('.fordeling__header__forelder:nth-child(2)')
				.contains(defaultForelder2);
		});
	});
	describe('Legge til arbeid', () => {
		it('viser dialog', () => {
			cy.get('button[data-ref="leggTilKnapp"]').click();
			cy.get('.utsettelseSkjema').contains('Legg til opphold');
		});
		it('velger mor', () => {
			cy.get('input[data-ref="forelder_forelder1"]').click();
		});
		it('velger arbeid', () => {
			cy.get('input[data-ref="utsettelse_arbeid"]').click();
		});
		it('setter datoer', () => {
			cy.get('#startdato').type(arbeidPeriode.start);
			cy
				.get('#sluttdato')
				.type(arbeidPeriode.slutt)
				.blur();
		});
		it('legger til og finner oppholdet i tidslinjen', () => {
			cy.get('.utsettelseSkjema button[type="submit"]').click();
			cy.get('#permisjonsplan').contains('Arbeid Mor');
		});
		it('lar bruker endre opphold', () => {
			cy.get('#permisjonsplan .redigerUtsettelseKnapp').click();
			cy.get('input[data-ref="utsettelse_ferie"]').click();
			cy.get('.utsettelseSkjema button[type="submit"]').click();
			cy.get('#permisjonsplan').contains('Ferie Mor');
		});
		it('lar bruker slette opphold', () => {
			cy.get('#permisjonsplan .redigerUtsettelseKnapp').click();
			cy.get('.utsettelseSkjema button[data-ref="fjern-knapp"]').click();
			cy
				.get('#permisjonsplan')
				.contains('Ferie Mor')
				.should('not.exist');
		});
	});
});
