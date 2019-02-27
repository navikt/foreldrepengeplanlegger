export const AppRoot = '/foreldrepengeplanlegger';

export enum Side {
    'START' = 'startside',
    'DEKNINGSGRAD' = 'dekningsgradside',
    'UTTAKSPLAN' = 'uttaksplan'
}

export const AppRoutes = {
    startside: `${AppRoot}`,
    uttaksplanside: `${AppRoot}/plan`,
    dekningsgradside: `${AppRoot}/dekning`,
    dev: `${AppRoot}/dev`
};
