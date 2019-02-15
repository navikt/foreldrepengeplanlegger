import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import posed, { PoseGroup } from 'react-pose';
import { Knapp, Flatknapp } from 'nav-frontend-knapper';

interface Props {}

import './dev.less';
import Knapperad from 'common/components/knapperad/Knapperad';

interface State {
    countries: Country[];
}

const PosedLi = posed.li({
    flip: {
        y: 0,
        transition: {
            y: { type: 'spring', stiffness: 500, damping: 100 },
            default: {
                type: 'spring'
            }
        }
    },
    enter: {
        x: 0,
        opacity: 1,
        transition: {
            x: { type: 'spring', stiffness: 500, damping: 100 },
            default: { duration: 250 }
        }
    },
    exit: {
        x: '-100%',
        opacity: 0
    }
});

interface Country {
    name: string;
    code: string;
    value: number;
}
const countryListBase: any[] = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Land Islands', code: 'AX' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'AndorrA', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Anguilla', code: 'AI' },
    { name: 'Antarctica', code: 'AQ' },
    { name: 'Antigua and Barbuda', code: 'AG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Aruba', code: 'AW' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Barbados', code: 'BB' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bermuda', code: 'BM' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Bouvet Island', code: 'BV' },
    { name: 'Brazil', code: 'BR' },
    { name: 'British Indian Ocean Territory', code: 'IO' },
    { name: 'Brunei Darussalam', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Cape Verde', code: 'CV' },
    { name: 'Cayman Islands', code: 'KY' },
    { name: 'Central African Republic', code: 'CF' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Christmas Island', code: 'CX' },
    { name: 'Cocos (Keeling) Islands', code: 'CC' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Congo', code: 'CG' },
    { name: 'Congo, The Democratic Republic of the', code: 'CD' },
    { name: 'Cook Islands', code: 'CK' },
    { name: 'Costa Rica', code: 'CR' },
    { name: 'Cote DIvoire', code: 'CI' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Falkland Islands (Malvinas)', code: 'FK' },
    { name: 'Faroe Islands', code: 'FO' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' }
];

const resetCountryValues = (countries: Country[]): Country[] =>
    countries.map((c, idx) => ({ ...c, value: (idx + 1) * 2 }));

const countryList = resetCountryValues(countryListBase);

const sortCountry = (c1: Country, c2: Country) => {
    return c1.value < c2.value ? -1 : 1;
};

const setCountryValue = (countries: Country[], country: Country, value: number): Country[] => {
    const newList = countries.map((c) => (c.code === country.code ? { ...c, value } : c));
    return resetCountryValues(newList.sort(sortCountry));
};

class DevList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            countries: countryList.slice(0, 5)
        };
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.removeMe = this.removeMe.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    add() {
        const { countries } = this.state;
        this.setState({
            countries: [...countries, countryList[countries.length]]
        });
    }

    remove() {
        this.setState({
            countries: this.state.countries.slice(0, this.state.countries.length - 1)
        });
    }

    removeMe(countryCode: string) {
        this.setState({
            countries: this.state.countries.filter((c) => c.code !== countryCode)
        });
    }

    moveUp(country: Country) {
        this.setValue(country, country.value + 3);
    }

    moveDown(country: Country) {
        this.setValue(country, country.value - 3);
    }

    setValue(country: Country, value: number) {
        this.setState({
            countries: setCountryValue(this.state.countries, country, value)
        });
    }

    render() {
        const { countries } = this.state;
        return (
            <div className="devWrapper">
                <Undertittel>DevList</Undertittel>
                <Knapp onClick={() => this.add()}>+</Knapp>
                <Knapp onClick={() => this.remove()}>-</Knapp>
                <ul className="devList">
                    <PoseGroup>
                        {countries.sort(sortCountry).map((country) => (
                            <PosedLi className={`devList__item country-${country.code}`} key={country.code}>
                                {country.name} ({country.value})
                                <Knapperad>
                                    <Flatknapp onClick={() => this.moveUp(country)}>+</Flatknapp>
                                    <Flatknapp onClick={() => this.moveDown(country)}>-</Flatknapp>
                                    <Flatknapp onClick={() => this.removeMe(country.code)}>Slett</Flatknapp>
                                    <Flatknapp onClick={() => this.setValue(country, 5)}>Set 5</Flatknapp>
                                </Knapperad>
                            </PosedLi>
                        ))}
                    </PoseGroup>
                </ul>
                <hr />
                <ol>
                    {countries.map((country) => (
                        <li key={country.code}>{country.name}</li>
                    ))}
                </ol>
            </div>
        );
    }
}
export default DevList;
