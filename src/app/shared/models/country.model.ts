export interface Country {
    name: {
        common: string;
    }
    capital: string[];
    region: string;
    subregion: string;
    flag: string;
}

export interface countryName {
    name: {
        common: string;
    }
}

export interface subRegion {
    subregion: string;
}

export interface capitalCity {
    capital: string[];
}

// Interface for the individual currency details
export interface CurrencyDetails {
    name: string;
    symbol: string;
}

// Interface for the currencies, using an index signature to represent dynamic currency codes
export interface Currencies {
    [currencyCode: string]: CurrencyDetails;
}

// Example usage within a larger model (e.g., Country)
export interface Currency {
    currencies: Currencies;
}