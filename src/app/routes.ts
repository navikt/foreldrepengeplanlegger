export const AppRoot = '/foreldrepengeplanlegger';

export enum Side {
    'START' = '',
    'DEKNINGSGRAD' = 'antallUker',
    'UTTAKSPLAN' = 'plan'
}

export const AppRoutes = {
    startside: `${AppRoot}`,
    uttaksplanside: `${AppRoot}/${Side.UTTAKSPLAN}`,
    dekningsgradside: `${AppRoot}/${Side.DEKNINGSGRAD}`
};
