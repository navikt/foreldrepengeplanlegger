export interface FormInput {
	key: string;
	value: string;
	savedValue: string;
}

export interface FormState {
	inputs?: FormInput[];
}

const defaultState: FormState = {};

const FormReducer = (state = defaultState, action: {}) => {
	return state;
};

export default FormReducer;
