export interface Tidsperiode {
	start: Date;
	slutt: Date;
}

export function kalkulerUttaksdagerIPeriode(start: Date, slutt: Date): number {
	if (start > slutt) {
		return -1;
	}
	let startDato = new Date(start.getTime());
	let sluttDato = new Date(slutt.getTime());
	let antall = 0;
	while (startDato <= sluttDato) {
		if (start.getDay() !== 0 && start.getDay() !== 6) {
			antall++;
		}
		startDato.setDate(startDato.getDate() + 1);
	}
	return antall;
}
