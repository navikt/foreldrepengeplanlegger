import { History } from 'history';

export const appPath = '/planlegger';

export const Sider = {
	forside: `${appPath}/`,
	uttaksplan: `${appPath}/uttaksplan`
};

export const gotoForside = (history: History) => {
	history.push(Sider.forside);
};

export const gotoUttaksplan = (history: History) => {
	history.push(Sider.uttaksplan);
};
