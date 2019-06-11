import { UttaksplanFarge } from 'common/types';

export enum UttaksplanHexFarge {
    lilla = '#634689',
    blaa = '#3385d1',
    gronn = '#06893a',
    gul = '#ff9100',
    graa = '#7f756c',
    rammeGraa = '#c6c2bf',
    rod = '#BA3A26',
    hvit = '#ffffff'
}

export const getUttaksplanHexFromFarge = (farge: UttaksplanFarge): UttaksplanHexFarge => {
    switch (farge) {
        case 'blaa':
            return UttaksplanHexFarge.blaa;
        case 'graa':
            return UttaksplanHexFarge.graa;
        case 'gronn':
            return UttaksplanHexFarge.gronn;
        case 'gul':
            return UttaksplanHexFarge.gul;
        case 'hvit':
            return UttaksplanHexFarge.hvit;
        case 'lilla':
            return UttaksplanHexFarge.lilla;
    }
};
