
export interface CurrencyItem {
  label: string;
  value: string;
}

export interface CurrencyGroup {
  label: string;
  code: string;
  items: CurrencyItem[];
}

export const groupedCurrencies: CurrencyGroup[] = [
  {
    label: "Asia",
    code: "Asia",
    items: [
      { label: "United Arab Emirates Dirham - AED", value: "AED" },
      { label: "Afghan Afghani - AFN", value: "AFN" },
      { label: "Armenian Dram - AMD", value: "AMD" },
      { label: "Azerbaijani Manat - AZN", value: "AZN" },
      { label: "Bangladeshi Taka - BDT", value: "BDT" },
      { label: "Bahraini Dinar - BHD", value: "BHD" },
      { label: "Brunei Dollar - BND", value: "BND" },
      { label: "Chinese Yuan - CNY", value: "CNY" },
      { label: "Georgian Lari - GEL", value: "GEL" },
      { label: "Hong Kong Dollar - HKD", value: "HKD" },
      { label: "Indian Rupee - INR", value: "INR" },
      { label: "Indonesian Rupiah - IDR", value: "IDR" },
      { label: "Iranian Rial - IRR", value: "IRR" },
      { label: "Iraqi Dinar - IQD", value: "IQD" },
      { label: "Israeli New Shekel - ILS", value: "ILS" },
      { label: "Japanese Yen - JPY", value: "JPY" },
      { label: "Jordanian Dinar - JOD", value: "JOD" },
      { label: "Kazakhstani Tenge - KZT", value: "KZT" },
      { label: "Kuwaiti Dinar - KWD", value: "KWD" },
      { label: "Kyrgyzstani Som - KGS", value: "KGS" },
      { label: "Lao Kip - LAK", value: "LAK" },
      { label: "Lebanese Pound - LBP", value: "LBP" },
      { label: "Malaysian Ringgit - MYR", value: "MYR" },
      { label: "Maldivian Rufiyaa - MVR", value: "MVR" },
      { label: "Mongolian Tögrög - MNT", value: "MNT" },
      { label: "Myanmar Kyat - MMK", value: "MMK" },
      { label: "Nepalese Rupee - NPR", value: "NPR" },
      { label: "Omani Rial - OMR", value: "OMR" },
      { label: "Pakistani Rupee - PKR", value: "PKR" },
      { label: "Philippine Peso - PHP", value: "PHP" },
      { label: "Qatari Riyal - QAR", value: "QAR" },
      { label: "Saudi Riyal - SAR", value: "SAR" },
      { label: "Singapore Dollar - SGD", value: "SGD" },
      { label: "South Korean Won - KRW", value: "KRW" },
      { label: "Sri Lankan Rupee - LKR", value: "LKR" },
      { label: "Syrian Pound - SYP", value: "SYP" },
      { label: "Taiwan Dollar - TWD", value: "TWD" },
      { label: "Tajikistani Somoni - TJS", value: "TJS" },
      { label: "Thai Baht - THB", value: "THB" },
      { label: "Turkmenistani Manat - TMT", value: "TMT" },
      { label: "Uzbekistani Som - UZS", value: "UZS" },
      { label: "Vietnamese Đồng - VND", value: "VND" },
      { label: "Yemeni Rial - YER", value: "YER" },
    ],
  },
  {
    label: "Europe",
    code: "Europe",
    items: [
      { label: "Albanian Lek - ALL", value: "ALL" },
      { label: "British Pound Sterling - GBP", value: "GBP" },
      { label: "Bosnia-Herzegovina Convertible Mark - BAM", value: "BAM" },
      { label: "Bulgarian Lev - BGN", value: "BGN" },
      { label: "Croatian Kuna - HRK", value: "HRK" },
      { label: "Czech Koruna - CZK", value: "CZK" },
      { label: "Danish Krone - DKK", value: "DKK" },
      { label: "Euro - EUR", value: "EUR" },
      { label: "Faroese Króna - FOK", value: "FOK" },
      { label: "Hungarian Forint - HUF", value: "HUF" },
      { label: "Icelandic Króna - ISK", value: "ISK" },
      { label: "Macedonian Denar - MKD", value: "MKD" },
      { label: "Moldovan Leu - MDL", value: "MDL" },
      { label: "Norwegian Krone - NOK", value: "NOK" },
      { label: "Polish Złoty - PLN", value: "PLN" },
      { label: "Romanian Leu - RON", value: "RON" },
      { label: "Russian Ruble - RUB", value: "RUB" },
      { label: "Serbian Dinar - RSD", value: "RSD" },
      { label: "Swiss Franc - CHF", value: "CHF" },
      { label: "Ukrainian Hryvnia - UAH", value: "UAH" },
    ],
  },
  {
    label: "North America",
    code: "North America",
    items: [
      { label: "Aruban Florin - AWG", value: "AWG" },
      { label: "Barbadian Dollar - BBD", value: "BBD" },
      { label: "Bermudian Dollar - BMD", value: "BMD" },
      { label: "Bahamian Dollar - BSD", value: "BSD" },
      { label: "Belize Dollar - BZD", value: "BZD" },
      { label: "Canadian Dollar - CAD", value: "CAD" },
      { label: "Cayman Islands Dollar - KYD", value: "KYD" },
      { label: "Costa Rican Colón - CRC", value: "CRC" },
      { label: "Cuban Peso - CUP", value: "CUP" },
      { label: "Dominican Peso - DOP", value: "DOP" },
      { label: "East Caribbean Dollar - XCD", value: "XCD" },
      { label: "Guatemalan Quetzal - GTQ", value: "GTQ" },
      { label: "Haitian Gourde - HTG", value: "HTG" },
      { label: "Honduran Lempira - HNL", value: "HNL" },
      { label: "Jamaican Dollar - JMD", value: "JMD" },
      { label: "Mexican Peso - MXN", value: "MXN" },
      { label: "Nicaraguan Córdoba - NIO", value: "NIO" },
      { label: "Panamanian Balboa - PAB", value: "PAB" },
      { label: "Trinidad and Tobago Dollar - TTD", value: "TTD" },
      { label: "United States Dollar - USD", value: "USD" },
    ],
  },
  {
    label: "South America",
    code: "South America",
    items: [
      { label: "Argentine Peso - ARS", value: "ARS" },
      { label: "Bolivian Boliviano - BOB", value: "BOB" },
      { label: "Brazilian Real - BRL", value: "BRL" },
      { label: "Chilean Peso - CLP", value: "CLP" },
      { label: "Colombian Peso - COP", value: "COP" },
      { label: "Falkland Islands Pound - FKP", value: "FKP" },
      { label: "Guyanese Dollar - GYD", value: "GYD" },
      { label: "Paraguayan Guaraní - PYG", value: "PYG" },
      { label: "Peruvian Sol - PEN", value: "PEN" },
      { label: "Surinamese Dollar - SRD", value: "SRD" },
      { label: "Uruguayan Peso - UYU", value: "UYU" },
      { label: "Venezuelan Bolívar - VES", value: "VES" },
      { label: "Venezuelan Bolívar - Blackmarket - VEF_BLKMKT", value: "VEF_BLKMKT" },
      { label: "Venezuelan Bolívar - DIPRO - VEF_DIPRO", value: "VEF_DIPRO" },
      { label: "Venezuelan Bolívar - DICOM - VEF_DICOM", value: "VEF_DICOM" },
    ],
  },
  {
    label: "Africa",
    code: "Africa",
    items: [
      { label: "Algerian Dinar - DZD", value: "DZD" },
      { label: "Angolan Kwanza - AOA", value: "AOA" },
      { label: "Botswana Pula - BWP", value: "BWP" },
      { label: "Burundian Franc - BIF", value: "BIF" },
      { label: "Cape Verdean Escudo - CVE", value: "CVE" },
      { label: "Central African CFA Franc - XAF", value: "XAF" },
      { label: "Comorian Franc - KMF", value: "KMF" },
      { label: "Congolese Franc - CDF", value: "CDF" },
      { label: "Djiboutian Franc - DJF", value: "DJF" },
      { label: "Egyptian Pound - EGP", value: "EGP" },
      { label: "Eritrean Nakfa - ERN", value: "ERN" },
      { label: "Eswatini Lilangeni - SZL", value: "SZL" },
      { label: "Ethiopian Birr - ETB", value: "ETB" },
      { label: "Gambian Dalasi - GMD", value: "GMD" },
      { label: "Ghanaian Cedi - GHS", value: "GHS" },
      { label: "Guinean Franc - GNF", value: "GNF" },
      { label: "Kenyan Shilling - KES", value: "KES" },
      { label: "Lesotho Loti - LSL", value: "LSL" },
      { label: "Liberian Dollar - LRD", value: "LRD" },
      { label: "Libyan Dinar - LYD", value: "LYD" },
      { label: "Malagasy Ariary - MGA", value: "MGA" },
      { label: "Malawian Kwacha - MWK", value: "MWK" },
      { label: "Mauritanian Ouguiya - MRU", value: "MRU" },
      { label: "Mauritian Rupee - MUR", value: "MUR" },
      { label: "Moroccan Dirham - MAD", value: "MAD" },
      { label: "Mozambican Metical - MZN", value: "MZN" },
      { label: "Namibian Dollar - NAD", value: "NAD" },
      { label: "Nigerian Naira - NGN", value: "NGN" },
      { label: "Rwandan Franc - RWF", value: "RWF" },
      { label: "Sao Tome and Principe Dobra - STN", value: "STN" },
      { label: "Seychellois Rupee - SCR", value: "SCR" },
      { label: "Sierra Leonean Leone - SLE", value: "SLE" },
      { label: "Somali Shilling - SOS", value: "SOS" },
      { label: "South African Rand - ZAR", value: "ZAR" },
      { label: "South Sudanese Pound - SSP", value: "SSP" },
      { label: "Sudanese Pound - SDG", value: "SDG" },
      { label: "Tanzanian Shilling - TZS", value: "TZS" },
      { label: "Tunisian Dinar - TND", value: "TND" },
      { label: "Ugandan Shilling - UGX", value: "UGX" },
      { label: "West African CFA Franc - XOF", value: "XOF" },
      { label: "Zambian Kwacha - ZMW", value: "ZMW" },
      { label: "Zimbabwean Dollar - ZWL", value: "ZWL" },
    ],
  },
  {
    label: "Oceania",
    code: "Oceania",
    items: [
      { label: "Australian Dollar - AUD", value: "AUD" },
      { label: "Fijian Dollar - FJD", value: "FJD" },
      { label: "Kiribati Dollar - KID", value: "KID" },
      { label: "New Zealand Dollar - NZD", value: "NZD" },
      { label: "Papua New Guinean Kina - PGK", value: "PGK" },
      { label: "Samoan Tala - WST", value: "WST" },
      { label: "Solomon Islands Dollar - SBD", value: "SBD" },
      { label: "Tongan Paʻanga - TOP", value: "TOP" },
      { label: "Tuvaluan Dollar - TVD", value: "TVD" },
      { label: "Vanuatu Vatu - VUV", value: "VUV" },
      { label: "CFP Franc - XPF", value: "XPF" },
    ],
  },
];
