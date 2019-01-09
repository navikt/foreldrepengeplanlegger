import common, { CommonState } from './commonReducer';
import uttak, { UttakState } from './uttakReducer';

interface MainState {
    common: CommonState;
    uttak: UttakState;
}

export type AppState = MainState;

export default { common, uttak };
