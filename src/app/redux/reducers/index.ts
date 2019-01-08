import common, { CommonState } from './commonReducer';

interface MainState {
    common: CommonState;
}

export type AppState = MainState;

export default { common };
