import React, { useState, useEffect } from 'react'
import { View, Modal, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import {
    Header,
    Button,
    CustomText,
    ActivityIndicator,
} from '../../components'
import { Metrics, Colors, Images, Fonts, Icons } from '../../theme';
import CountryPicker from 'react-native-country-picker-modal'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';



const array = ['Country of Residence', 'Nationality']

export default function SignUpTwo({ navigation }) {
    const dispatch = useDispatch();
    const { country_of_residence,
        nationality,
        gender,
        date_of_birth,dateToBeShown,
        zodiac } = useSelector(state => state.root);
    // var nationalities = [
    //     {
    //         "value": "Afghanistan",
    //         "label": "Afghan"
    //     },
    //     {
    //         "value": "Albania",
    //         "label": "Albanian"
    //     },
    //     {
    //         "value": "Algeria",
    //         "label": "Algerian"
    //     },
    //     {
    //         "value": "American Samoa",
    //         "label": "American Samoan"
    //     },
    //     {
    //         "value": "Andorra",
    //         "label": "Andorran"
    //     },
    //     {
    //         "value": "Angola",
    //         "label": "Angolan"
    //     },
    //     {
    //         "value": "Anguilla",
    //         "label": "Anguillian"
    //     },
    //     {
    //         "value": "Antigua and Barbuda",
    //         "label": "Antiguan, Barbudan"
    //     },
    //     {
    //         "value": "Argentina",
    //         "label": "Argentinean"
    //     },
    //     {
    //         "value": "Armenia",
    //         "label": "Armenian"
    //     },
    //     {
    //         "value": "Aruba",
    //         "label": "Aruban"
    //     },
    //     {
    //         "value": "Australia",
    //         "label": "Australian"
    //     },
    //     {
    //         "value": "Austria",
    //         "label": "Austrian"
    //     },
    //     {
    //         "value": "Azerbaijan",
    //         "label": "Azerbaijani"
    //     },
    //     {
    //         "value": "Bahamas",
    //         "label": "Bahamian"
    //     },
    //     {
    //         "value": "Bahrain",
    //         "label": "Bahraini"
    //     },
    //     {
    //         "value": "Bangladesh",
    //         "label": "Bangladeshi"
    //     },
    //     {
    //         "value": "Barbados",
    //         "label": "Barbadian"
    //     },
    //     {
    //         "value": "Belarus",
    //         "label": "Belarusian"
    //     },
    //     {
    //         "value": "Belgium",
    //         "label": "Belgian"
    //     },
    //     {
    //         "value": "Belize",
    //         "label": "Belizean"
    //     },
    //     {
    //         "value": "Benin",
    //         "label": "Beninese"
    //     },
    //     {
    //         "value": "Bermuda",
    //         "label": "Bermudian"
    //     },
    //     {
    //         "value": "Bhutan",
    //         "label": "Bhutanese"
    //     },
    //     {
    //         "value": "Bolivia (Plurinational State of)",
    //         "label": "Bolivian"
    //     },
    //     {
    //         "value": "Bosnia and Herzegovina",
    //         "label": "Bosnian, Herzegovinian"
    //     },
    //     {
    //         "value": "Botswana",
    //         "label": "Motswana"
    //     },
    //     {
    //         "value": "Brazil",
    //         "label": "Brazilian"
    //     },
    //     {
    //         "value": "Brunei Darussalam",
    //         "label": "Bruneian"
    //     },
    //     {
    //         "value": "Bulgaria",
    //         "label": "Bulgarian"
    //     },
    //     {
    //         "value": "Burkina Faso",
    //         "label": "Burkinabe"
    //     },
    //     {
    //         "value": "Burundi",
    //         "label": "Burundian"
    //     },
    //     {
    //         "value": "Cabo Verde",
    //         "label": "Cape Verdian"
    //     },
    //     {
    //         "value": "Cambodia",
    //         "label": "Cambodian"
    //     },
    //     {
    //         "value": "Cameroon",
    //         "label": "Cameroonian"
    //     },
    //     {
    //         "value": "Canada",
    //         "label": "Canadian"
    //     },
    //     {
    //         "value": "Cayman Islands",
    //         "label": "Caymanian"
    //     },
    //     {
    //         "value": "Central African Republic",
    //         "label": "Central African"
    //     },
    //     {
    //         "value": "Chad",
    //         "label": "Chadian"
    //     },
    //     {
    //         "value": "Chile",
    //         "label": "Chilean"
    //     },
    //     {
    //         "value": "China",
    //         "label": "Chinese"
    //     },
    //     {
    //         "value": "Christmas Island",
    //         "label": "Christmas Island"
    //     },
    //     {
    //         "value": "Cocos (Keeling) Islands",
    //         "label": "Cocos Islander"
    //     },
    //     {
    //         "value": "Colombia",
    //         "label": "Colombian"
    //     },
    //     {
    //         "value": "Comoros",
    //         "label": "Comoran"
    //     },
    //     {
    //         "value": "Congo",
    //         "label": "Congolese"
    //     },
    //     {
    //         "value": "Congo (Democratic Republic of the)",
    //         "label": "Congolese (Democratic Republic)"
    //     },
    //     {
    //         "value": "Cook Islands",
    //         "label": "Cook Islander"
    //     },
    //     {
    //         "value": "Costa Rica",
    //         "label": "Costa Rican"
    //     },
    //     {
    //         "value": "Croatia",
    //         "label": "Croatian"
    //     },
    //     {
    //         "value": "Cuba",
    //         "label": "Cuban"
    //     },
    //     {
    //         "value": "Curaçao",
    //         "label": "Curaçaoan"
    //     },
    //     {
    //         "value": "Cyprus",
    //         "label": "Cypriot"
    //     },
    //     {
    //         "value": "Czech Republic",
    //         "label": "Czech"
    //     },
    //     {
    //         "value": "Côte d'Ivoire",
    //         "label": "Ivorian"
    //     },
    //     {
    //         "value": "Denmark",
    //         "label": "Danish"
    //     },
    //     {
    //         "value": "Djibouti",
    //         "label": "Djibouti"
    //     },
    //     {
    //         "value": "Dominican Republic",
    //         "label": "Dominican"
    //     },
    //     {
    //         "value": "Ecuador",
    //         "label": "Ecuadorean"
    //     },
    //     {
    //         "value": "Egypt",
    //         "label": "Egyptian"
    //     },
    //     {
    //         "value": "El Salvador",
    //         "label": "Salvadoran"
    //     },
    //     {
    //         "value": "Equatorial Guinea",
    //         "label": "Equatorial Guinean"
    //     },
    //     {
    //         "value": "Eritrea",
    //         "label": "Eritrean"
    //     },
    //     {
    //         "value": "Estonia",
    //         "label": "Estonian"
    //     },
    //     {
    //         "value": "Ethiopia",
    //         "label": "Ethiopian"
    //     },
    //     {
    //         "value": "Falkland Islands (Malvinas)",
    //         "label": "Falkland Islander"
    //     },
    //     {
    //         "value": "Faroe Islands",
    //         "label": "Faroese"
    //     },
    //     {
    //         "value": "Fiji",
    //         "label": "Fijian"
    //     },
    //     {
    //         "value": "Finland",
    //         "label": "Finnish"
    //     },
    //     {
    //         "value": "France",
    //         "label": "French"
    //     },
    //     {
    //         "value": "French Guiana",
    //         "label": "French Guianese"
    //     },
    //     {
    //         "value": "French Polynesia",
    //         "label": "French Polynesian"
    //     },
    //     {
    //         "value": "Gabon",
    //         "label": "Gabonese"
    //     },
    //     {
    //         "value": "Gambia",
    //         "label": "Gambian"
    //     },
    //     {
    //         "value": "Georgia",
    //         "label": "Georgian"
    //     },
    //     {
    //         "value": "Germany",
    //         "label": "German"
    //     },
    //     {
    //         "value": "Ghana",
    //         "label": "Ghanaian"
    //     },
    //     {
    //         "value": "Gibraltar",
    //         "label": "Gibraltar"
    //     },
    //     {
    //         "value": "Greece",
    //         "label": "Greek"
    //     },
    //     {
    //         "value": "Greenland",
    //         "label": "Greenlandic"
    //     },
    //     {
    //         "value": "Grenada",
    //         "label": "Grenadian"
    //     },
    //     {
    //         "value": "Guadeloupe",
    //         "label": "Guadeloupian"
    //     },
    //     {
    //         "value": "Guam",
    //         "label": "Guamanian"
    //     },
    //     {
    //         "value": "Guatemala",
    //         "label": "Guatemalan"
    //     },
    //     {
    //         "value": "Guinea",
    //         "label": "Guinean"
    //     },
    //     {
    //         "value": "Guinea-Bissau",
    //         "label": "Guinea-Bissauan"
    //     },
    //     {
    //         "value": "Guyana",
    //         "label": "Guyanese"
    //     },
    //     {
    //         "value": "Haiti",
    //         "label": "Haitian"
    //     },
    //     {
    //         "value": "Honduras",
    //         "label": "Honduran"
    //     },
    //     {
    //         "value": "Hong Kong",
    //         "label": "Hong Kongese"
    //     },
    //     {
    //         "value": "Hungary",
    //         "label": "Hungarian"
    //     },
    //     {
    //         "value": "Iceland",
    //         "label": "Icelander"
    //     },
    //     {
    //         "value": "India",
    //         "label": "Indian"
    //     },
    //     {
    //         "value": "Indonesia",
    //         "label": "Indonesian"
    //     },
    //     {
    //         "value": "Iran (Islamic Republic of)",
    //         "label": "Iranian"
    //     },
    //     {
    //         "value": "Iraq",
    //         "label": "Iraqi"
    //     },
    //     {
    //         "value": "Ireland",
    //         "label": "Irish"
    //     },
    //     {
    //         "value": "Isle of Man",
    //         "label": "Manx"
    //     },
    //     {
    //         "value": "Israel",
    //         "label": "Israeli"
    //     },
    //     {
    //         "value": "Italy",
    //         "label": "Italian"
    //     },
    //     {
    //         "value": "Jamaica",
    //         "label": "Jamaican"
    //     },
    //     {
    //         "value": "Japan",
    //         "label": "Japanese"
    //     },
    //     {
    //         "value": "Jordan",
    //         "label": "Jordanian"
    //     },
    //     {
    //         "value": "Kazakhstan",
    //         "label": "Kazakhstani"
    //     },
    //     {
    //         "value": "Kenya",
    //         "label": "Kenyan"
    //     },
    //     {
    //         "value": "Kiribati",
    //         "label": "I-Kiribati"
    //     },
    //     {
    //         "value": "Korea (Democratic People's Republic of)",
    //         "label": "North Korean"
    //     },
    //     {
    //         "value": "Korea (Republic of)",
    //         "label": "South Korean"
    //     },
    //     {
    //         "value": "Kuwait",
    //         "label": "Kuwaiti"
    //     },
    //     {
    //         "value": "Kyrgyzstan",
    //         "label": "Kirghiz"
    //     },
    //     {
    //         "value": "Lao People's Democratic Republic",
    //         "label": "Laotian"
    //     },
    //     {
    //         "value": "Latvia",
    //         "label": "Latvian"
    //     },
    //     {
    //         "value": "Lebanon",
    //         "label": "Lebanese"
    //     },
    //     {
    //         "value": "Lesotho",
    //         "label": "Mosotho"
    //     },
    //     {
    //         "value": "Liberia",
    //         "label": "Liberian"
    //     },
    //     {
    //         "value": "Libya",
    //         "label": "Libyan"
    //     },
    //     {
    //         "value": "Liechtenstein",
    //         "label": "Liechtensteiner"
    //     },
    //     {
    //         "value": "Lithuania",
    //         "label": "Lithuanian"
    //     },
    //     {
    //         "value": "Luxembourg",
    //         "label": "Luxembourger"
    //     },
    //     {
    //         "value": "Macao",
    //         "label": "Macanese"
    //     },
    //     {
    //         "value": "Macedonia (the former Yugoslav Republic of)",
    //         "label": "Macedonian"
    //     },
    //     {
    //         "value": "Madagascar",
    //         "label": "Malagasy"
    //     },
    //     {
    //         "value": "Malawi",
    //         "label": "Malawian"
    //     },
    //     {
    //         "value": "Malaysia",
    //         "label": "Malaysian"
    //     },
    //     {
    //         "value": "Maldives",
    //         "label": "Maldivan"
    //     },
    //     {
    //         "value": "Mali",
    //         "label": "Malian"
    //     },
    //     {
    //         "value": "Malta",
    //         "label": "Maltese"
    //     },
    //     {
    //         "value": "Marshall Islands",
    //         "label": "Marshallese"
    //     },
    //     {
    //         "value": "Martinique",
    //         "label": "Martinican"
    //     },
    //     {
    //         "value": "Mauritania",
    //         "label": "Mauritanian"
    //     },
    //     {
    //         "value": "Mauritius",
    //         "label": "Mauritian"
    //     },
    //     {
    //         "value": "Mayotte",
    //         "label": "Mahoran"
    //     },
    //     {
    //         "value": "Mexico",
    //         "label": "Mexican"
    //     },
    //     {
    //         "value": "Micronesia (Federated States of)",
    //         "label": "Micronesian"
    //     },
    //     {
    //         "value": "Moldova (Republic of)",
    //         "label": "Moldovan"
    //     },
    //     {
    //         "value": "Monaco",
    //         "label": "Monegasque"
    //     },
    //     {
    //         "value": "Mongolia",
    //         "label": "Mongolian"
    //     },
    //     {
    //         "value": "Montenegro",
    //         "label": "Montenegrin"
    //     },
    //     {
    //         "value": "Montserrat",
    //         "label": "Montserratian"
    //     },
    //     {
    //         "value": "Morocco",
    //         "label": "Moroccan"
    //     },
    //     {
    //         "value": "Mozambique",
    //         "label": "Mozambican"
    //     },
    //     {
    //         "value": "Myanmar",
    //         "label": "Burmese"
    //     },
    //     {
    //         "value": "Namibia",
    //         "label": "Namibian"
    //     },
    //     {
    //         "value": "Nauru",
    //         "label": "Nauruan"
    //     },
    //     {
    //         "value": "Nepal",
    //         "label": "Nepalese"
    //     },
    //     {
    //         "value": "Netherlands",
    //         "label": "Dutch"
    //     },
    //     {
    //         "value": "New Caledonia",
    //         "label": "New Caledonian"
    //     },
    //     {
    //         "value": "New Zealand",
    //         "label": "New Zealander"
    //     },
    //     {
    //         "value": "Nicaragua",
    //         "label": "Nicaraguan"
    //     },
    //     {
    //         "value": "Niger",
    //         "label": "Nigerien"
    //     },
    //     {
    //         "value": "Nigeria",
    //         "label": "Nigerian"
    //     },
    //     {
    //         "value": "Niue",
    //         "label": "Niuean"
    //     },
    //     {
    //         "value": "Norfolk Island",
    //         "label": "Norfolk Islander"
    //     },
    //     {
    //         "value": "Norway",
    //         "label": "Norwegian"
    //     },
    //     {
    //         "value": "Oman",
    //         "label": "Omani"
    //     },
    //     {
    //         "value": "Pakistan",
    //         "label": "Pakistani"
    //     },
    //     {
    //         "value": "Palau",
    //         "label": "Palauan"
    //     },
    //     {
    //         "value": "Palestine, State of",
    //         "label": "Palestinian"
    //     },
    //     {
    //         "value": "Panama",
    //         "label": "Panamanian"
    //     },
    //     {
    //         "value": "Papua New Guinea",
    //         "label": "Papua New Guinean"
    //     },
    //     {
    //         "value": "Paraguay",
    //         "label": "Paraguayan"
    //     },
    //     {
    //         "value": "Peru",
    //         "label": "Peruvian"
    //     },
    //     {
    //         "value": "Philippines",
    //         "label": "Filipino"
    //     },
    //     {
    //         "value": "Pitcairn",
    //         "label": "Pitcairn Islander"
    //     },
    //     {
    //         "value": "Poland",
    //         "label": "Polish"
    //     },
    //     {
    //         "value": "Portugal",
    //         "label": "Portuguese"
    //     },
    //     {
    //         "value": "Puerto Rico",
    //         "label": "Puerto Rican"
    //     },
    //     {
    //         "value": "Qatar",
    //         "label": "Qatari"
    //     },
    //     {
    //         "value": "Republic of Kosovo",
    //         "label": "Kosovar"
    //     },
    //     {
    //         "value": "Romania",
    //         "label": "Romanian"
    //     },
    //     {
    //         "value": "Russian Federation",
    //         "label": "Russian"
    //     },
    //     {
    //         "value": "Rwanda",
    //         "label": "Rwandan"
    //     },
    //     {
    //         "value": "Réunion",
    //         "label": "Réunionese"
    //     },
    //     {
    //         "value": "Saint Barthélemy",
    //         "label": "Saint Barthélemy Islander"
    //     },
    //     {
    //         "value": "Saint Helena, Ascension and Tristan da Cunha",
    //         "label": "Saint Helenian"
    //     },
    //     {
    //         "value": "Saint Kitts and Nevis",
    //         "label": "Kittian and Nevisian"
    //     },
    //     {
    //         "value": "Saint Lucia",
    //         "label": "Saint Lucian"
    //     },
    //     {
    //         "value": "Saint Martin (French part)",
    //         "label": "Saint Martin Islander"
    //     },
    //     {
    //         "value": "Saint Pierre and Miquelon",
    //         "label": "Saint-Pierrais"
    //     },
    //     {
    //         "value": "Saint Vincent and the Grenadines",
    //         "label": "Saint Vincentian"
    //     },
    //     {
    //         "value": "Samoa",
    //         "label": "Samoan"
    //     },
    //     {
    //         "value": "San Marino",
    //         "label": "Sammarinese"
    //     },
    //     {
    //         "value": "Sao Tome and Principe",
    //         "label": "Sao Tomean"
    //     },
    //     {
    //         "value": "Saudi Arabia",
    //         "label": "Saudi Arabian"
    //     },
    //     {
    //         "value": "Senegal",
    //         "label": "Senegalese"
    //     },
    //     {
    //         "value": "Serbia",
    //         "label": "Serbian"
    //     },
    //     {
    //         "value": "Seychelles",
    //         "label": "Seychellois"
    //     },
    //     {
    //         "value": "Sierra Leone",
    //         "label": "Sierra Leonean"
    //     },
    //     {
    //         "value": "Singapore",
    //         "label": "Singaporean"
    //     },
    //     {
    //         "value": "Slovakia",
    //         "label": "Slovak"
    //     },
    //     {
    //         "value": "Slovenia",
    //         "label": "Slovenian"
    //     },
    //     {
    //         "value": "Solomon Islands",
    //         "label": "Solomon Islander"
    //     },
    //     {
    //         "value": "Somalia",
    //         "label": "Somali"
    //     },
    //     {
    //         "value": "South Africa",
    //         "label": "South African"
    //     },
    //     {
    //         "value": "South Georgia and the South Sandwich Islands",
    //         "label": "South Georgia and the South Sandwich Islander"
    //     },
    //     {
    //         "value": "South Sudan",
    //         "label": "South Sudanese"
    //     },
    //     {
    //         "value": "Spain",
    //         "label": "Spanish"
    //     },
    //     {
    //         "value": "Sri Lanka",
    //         "label": "Sri Lankan"
    //     },
    //     {
    //         "value": "Sudan",
    //         "label": "Sudanese"
    //     },
    //     {
    //         "value": "Suriname",
    //         "label": "Surinamer"
    //     },
    //     {
    //         "value": "Swaziland",
    //         "label": "Swazi"
    //     },
    //     {
    //         "value": "Sweden",
    //         "label": "Swedish"
    //     },
    //     {
    //         "value": "Switzerland",
    //         "label": "Swiss"
    //     },
    //     {
    //         "value": "Syrian Arab Republic",
    //         "label": "Syrian"
    //     },
    //     {
    //         "value": "Taiwan",
    //         "label": "Taiwanese"
    //     },
    //     {
    //         "value": "Tajikistan",
    //         "label": "Tadzhik"
    //     },
    //     {
    //         "value": "Tanzania, United Republic of",
    //         "label": "Tanzanian"
    //     },
    //     {
    //         "value": "Thailand",
    //         "label": "Thai"
    //     },
    //     {
    //         "value": "Timor-Leste",
    //         "label": "East Timorese"
    //     },
    //     {
    //         "value": "Togo",
    //         "label": "Togolese"
    //     },
    //     {
    //         "value": "Tokelau",
    //         "label": "Tokelauan"
    //     },
    //     {
    //         "value": "Tonga",
    //         "label": "Tongan"
    //     },
    //     {
    //         "value": "Trinidad and Tobago",
    //         "label": "Trinidadian"
    //     },
    //     {
    //         "value": "Tunisia",
    //         "label": "Tunisian"
    //     },
    //     {
    //         "value": "Turkey",
    //         "label": "Turkish"
    //     },
    //     {
    //         "value": "Turkmenistan",
    //         "label": "Turkmen"
    //     },
    //     {
    //         "value": "Turks and Caicos Islands",
    //         "label": "Turks and Caicos Islander"
    //     },
    //     {
    //         "value": "Tuvalu",
    //         "label": "Tuvaluan"
    //     },
    //     {
    //         "value": "Uganda",
    //         "label": "Ugandan"
    //     },
    //     {
    //         "value": "Ukraine",
    //         "label": "Ukrainian"
    //     },
    //     {
    //         "value": "United Arab Emirates",
    //         "label": "Emirati"
    //     },
    //     {
    //         "value": "United Kingdom of Great Britain and Northern Ireland",
    //         "label": "British"
    //     },
    //     {
    //         "value": "United States of America",
    //         "label": "American"
    //     },
    //     {
    //         "value": "Uruguay",
    //         "label": "Uruguayan"
    //     },
    //     {
    //         "value": "Uzbekistan",
    //         "label": "Uzbekistani"
    //     },
    //     {
    //         "value": "Vanuatu",
    //         "label": "Ni-Vanuatu"
    //     },
    //     {
    //         "value": "Venezuela (Bolivarian Republic of)",
    //         "label": "Venezuelan"
    //     },
    //     {
    //         "value": "Viet Nam",
    //         "label": "Vietnamese"
    //     },
    //     {
    //         "value": "Virgin Islands (British)",
    //         "label": "Virgin Islander (British)"
    //     },
    //     {
    //         "value": "Virgin Islands (U.S.)",
    //         "label": "Virgin Islander (U.S.)"
    //     },
    //     {
    //         "value": "Wallis and Futuna",
    //         "label": "Wallis and Futuna Islander"
    //     },
    //     {
    //         "value": "Western Sahara",
    //         "label": "Sahrawi"
    //     },
    //     {
    //         "value": "Yemen",
    //         "label": "Yemeni"
    //     },
    //     {
    //         "value": "Zambia",
    //         "label": "Zambian"
    //     },
    //     {
    //         "value": "Zimbabwe",
    //         "label": "Zimbabwean"
    //     },
    //     {
    //         "value": "Åland Islands",
    //         "label": "Ålandish"
    //     }
    // ]
    const [nationalities, setNationalities] = useState([]);
    const [isLoading, setIsLoading] = useState(false)


    const [tzOffsetInMinutes, setTzOffsetInMinutes] = useState(undefined);
    // const [mode, setMode] = useState(MODE_VALUES[0]);
    const [show, setShow] = useState(false);
    const [textColor, setTextColor] = useState();
    const [accentColor, setAccentColor] = useState();
    // const [display, setDisplay] = useState(DISPLAY_VALUES[0]);
    const [interval, setMinInterval] = useState(1);
    const [neutralButtonLabel, setNeutralButtonLabel] = useState(undefined);
    const [disabled, setDisabled] = useState(false);
    const [minimumDate, setMinimumDate] = useState();
    const [maximumDate, setMaximumDate] = useState();
    const [countryCode, setCountryCode] = useState('AE');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [_nationality, setNationality] = useState(nationality === '' ? '' : nationality);
    const [_gender, setGender] = useState(gender === '' ? -1 : gender);


    const [optionModalVisible, setOptionModalVisible] = useState(false);

    const [country, setCountry] = useState(country_of_residence === 'United Arab Emirates' ? 'United Arab Emirates' : country_of_residence)
    const modalVisible = false
    const callingCode = null
    const withCountryNameButton = true
    const withFlag = true
    const withEmoji = true
    const withFilter = true
    const withAlphaFilter = true
    const withCallingCode = false

    const [_zodiac, setZodiac] = useState(zodiac === '' ? '' : zodiac)
    const [date, setDate] = useState(new Date())


    const getCountries = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get('https://arabiansuperstar.org/api/get_counties');
            setNationalities(response?.data)
            setIsLoading(false)
        } catch (error) {
            console.log({ error })
            setIsLoading(false)
        }
    }

    const onSelect = (response) => {
        console.log({ response })
        setCountryCode(response?.cca2)
        setCountry(response?.name)
    }


    const handleErrors = () => {
        if (!country !== '' && !_nationality !== '' && _gender !== '' && date !== '' && _zodiac !== '') {
            //   return true;
            dispatch({ type: 'country_of_residence', payload: country })
            dispatch({ type: 'nationality', payload: _nationality })
            dispatch({ type: 'gender', payload: _gender })
            dispatch({ type: 'date_of_birth', payload: date })
            dispatch({ type: 'zodiac', payload: _zodiac })

            navigation.navigate('SignUpThree')
        } else {
            alert('Please fill all the fields')
        }
    };

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')


    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function toMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString('en-US', {
          month: 'long',
        });
      }


    const dateOfBirth = (timeStamp) => {

        if(getAge(timeStamp) > 18) {       
        var dateObj = new Date(timeStamp);
        var _month = dateObj.getUTCMonth() + 1; //months from 1-12
        var _day = dateObj.getUTCDate();
        var _year = dateObj.getUTCFullYear();
        setDay(_day)
        setMonth(_month)
        setYear(_year)
        const newdate = _year + "/" + _month + "/" + _day;
        
console.log(toMonthName(1), _month)
        getZodiac(_day, toMonthName(_month))
        dispatch({ type: 'dateToBeShown', payload: {_day, _month, _year} })
    }else{
        alert('You must be 18 years old to register')
    }
        
    }

    const getZodiac = async (day, month) => {
        try {
            const response = await axios.post('https://arabiansuperstar.org/api/astro_sign', { day: day, month: month?.toLowerCase() }, { headers: { 'content-type': 'application/json' } });
            console.log(response?.data)
            setZodiac(response?.data?.sign)
        } catch (error) {
            console.log({ error })
        }
    }

useEffect(()=>{
    getCountries()
}, [])


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
             {isLoading && <ActivityIndicator
                isLoading={true}
                size="large"
            />}
            <ScrollView >

                <View style={{ height: Metrics.screenHeight * 0.8 }}>
                    <TouchableOpacity 
                    onPress={() => navigation?.goBack()}
                    style={{
                        marginTop: Metrics.screenHeight * 0.04,
                        marginBottom: Metrics.screenHeight * 0.01,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                    }}>
                        <Icons.Feather name={'chevron-left'} color={'rgba(46, 46, 46, 0.7)'} size={Metrics.ratio(24)} style={{ marginLeft: -Metrics.ratio(7) }} />
                        <CustomText
                            style={{
                                marginLeft: -Metrics.ratio(5),
                            }}
                            fontSize={Metrics.ratio(14)}
                            color='rgba(46, 46, 46, 0.7)'
                            fontWeight='bold'
                            title={'Back'}
                        />

                    </TouchableOpacity>

                    {array.map((item, index) => {
                        return (
                            <>
                                <CustomText
                                    style={{
                                        width: Metrics.screenWidth * 0.8,
                                        alignSelf: 'center', marginTop: Metrics.ratio(10),
                                        marginTop: Metrics.ratio(10),
                                        fontFamily: Fonts.type.RobotoRegular
                                    }}
                                    fontSize={Metrics.ratio(14)}
                                    color='#000'
                                    fontWeight='normal'
                                    title={item}
                                />
                                <View style={{
                                    height: Metrics.ratio(50),
                                    borderWidth: Metrics.ratio(1),
                                    borderColor: '#CC2D3A',
                                    borderRadius: Metrics.ratio(11),
                                    width: Metrics.screenWidth * 0.8,
                                    alignSelf: 'center',
                                    marginTop: Metrics.ratio(10),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    {index < 1 ? <><CountryPicker
                                        {...{
                                            countryCode,
                                            withFilter,
                                            withFlag,
                                            withCountryNameButton,
                                            withAlphaFilter,
                                            withCallingCode,
                                            withEmoji,
                                            onSelect,
                                        }}
                                        modalVisible
                                        containerButtonStyle={{ height: '100%', width: Metrics.screenWidth * 0.75, justifyContent: 'center', marginLeft: Metrics.ratio(10) }}
                                    />
                                        <Icons.Ionicons name={'caret-down-sharp'} color={'#CC2D3A'} size={Metrics.ratio(20)} style={{ marginLeft: -Metrics.ratio(30) }} />
                                    </> : 
                                    <View style={{ height: '100%', width: '100%', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>
                                        <Modal
                                            animationType="none"
                                            transparent={true}
                                            visible={optionModalVisible}
                                            onRequestClose={() => {
                                                setOptionModalVisible(!optionModalVisible);
                                            }}
                                        >
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                                <View style={{
                                                    backgroundColor: '#fff',
                                                    height: Metrics.screenHeight * 0.7,
                                                    width: Metrics.screenWidth * 0.8,
                                                    borderRadius: Metrics.ratio(11),
                                                }} >
                                                    <ScrollView>
                                                        <View>
                                                            {nationalities?.map((item, index) => {
                                                                return <TouchableOpacity onPress={() => (setNationality(item?.title), setOptionModalVisible(!optionModalVisible))}>
                                                                    <CustomText
                                                                        style={{
                                                                            width: Metrics.screenWidth * 0.8,
                                                                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                                                                            marginVertical: Metrics.ratio(15),
                                                                            textAlign: 'center',
                                                                        }}
                                                                        fontSize={Metrics.ratio(16)}
                                                                        color='#000'
                                                                        fontWeight='normal'
                                                                        title={item?.title}
                                                                    />
                                                                </TouchableOpacity>
                                                            })}
                                                        </View>
                                                    </ScrollView>
                                                </View>
                                            </View>
                                        </Modal>
                                        <TouchableOpacity onPress={() => setOptionModalVisible(true)} style={{ height: '100%', width: Metrics.screenWidth * 0.8, alignItems: 'center', flexDirection: 'row' }}>
                                            <CustomText
                                                style={{
                                                    width: Metrics.screenWidth * 0.8,
                                                    alignSelf: 'center', marginTop: Metrics.ratio(10),
                                                    marginVertical: Metrics.ratio(15),
                                                    paddingLeft: Metrics.ratio(10),
                                                }}
                                                fontSize={Metrics.ratio(16)}
                                                color='#000'
                                                fontWeight='normal'
                                                title={_nationality}
                                            />
                                            <Icons.Ionicons name={'caret-down-sharp'} color={'#CC2D3A'} size={Metrics.ratio(20)} style={{ marginLeft: -Metrics.ratio(38) }} />
                                        </TouchableOpacity>
                                    </View>}

                                </View>
                            </>
                        )
                    })}

                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginTop: Metrics.ratio(10),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={'Gender'}
                    />

                    <View style={{
                        flexDirection: 'row',
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                    }} >{['Male', 'Female'].map((item, index) => {
                        return <Button
                            onPress={() => setGender(index)}
                            height={Metrics.ratio(50)}
                            width={Metrics.screenWidth * 0.38}
                            fontSize={Metrics.ratio(15)}
                            title={item}
                            style={{ alignSelf: 'center', marginTop: Metrics.ratio(15), marginBottom: Metrics.ratio(10) }}
                            radius={Metrics.ratio(11)}
                            border={index === _gender ? false : true}
                        />
                    })}
                    </View>


                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginTop: Metrics.ratio(10),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={'Date of Birth'}
                    />
                    <View style={{
                        flexDirection: 'row',
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                    }} >

                        <TouchableOpacity style={{
                            height: Metrics.ratio(50),
                            borderWidth: Metrics.ratio(1),
                            borderColor: '#CC2D3A',
                            borderRadius: Metrics.ratio(11),
                            width: Metrics.screenWidth * 0.24,
                            alignSelf: 'center',
                            marginTop: Metrics.ratio(10),
                        }}
                            onPress={() => setShow(true)}
                        >
                            {show && <DateTimePicker
                                testID="dateTimePicker"
                                timeZoneOffsetInMinutes={tzOffsetInMinutes}
                                minuteInterval={interval}
                                maximumDate={maximumDate}
                                minimumDate={minimumDate}
                                value={date}
                                // mode={mode}
                                is24Hour
                                // display={display}
                                onChange={(e) => (setShow(false), dateOfBirth(e?.nativeEvent?.timestamp))}
                                // style={styles.iOsPicker}
                                textColor={textColor || undefined}
                                accentColor={accentColor || undefined}
                                neutralButtonLabel={neutralButtonLabel}
                                disabled={disabled}
                            />}
                            <CustomText
                                style={{
                                    alignSelf: 'center', marginTop: Metrics.ratio(10),
                                    marginTop: Metrics.ratio(10),
                                }}
                                fontSize={Metrics.ratio(14)}
                                color='#000'
                                fontWeight='normal'
                                title={dateToBeShown?._day ? dateToBeShown?._day : day}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            height: Metrics.ratio(50),
                            borderWidth: Metrics.ratio(1),
                            borderColor: '#CC2D3A',
                            borderRadius: Metrics.ratio(11),
                            width: Metrics.screenWidth * 0.24,
                            alignSelf: 'center',
                            marginTop: Metrics.ratio(10),
                        }}
                            onPress={() => setShow(true)}
                        >
                            <CustomText
                                style={{
                                    alignSelf: 'center', marginTop: Metrics.ratio(10),
                                    marginTop: Metrics.ratio(10),
                                }}
                                fontSize={Metrics.ratio(14)}
                                color='#000'
                                fontWeight='normal'
                                title={dateToBeShown?._month ? dateToBeShown?._month : month}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            height: Metrics.ratio(50),
                            borderWidth: Metrics.ratio(1),
                            borderColor: '#CC2D3A',
                            borderRadius: Metrics.ratio(11),
                            width: Metrics.screenWidth * 0.24,
                            alignSelf: 'center',
                            marginTop: Metrics.ratio(10),
                        }}
                            onPress={() => setShow(true)}
                        >
                            <CustomText
                                style={{
                                    alignSelf: 'center', marginTop: Metrics.ratio(10),
                                    marginTop: Metrics.ratio(10),
                                }}
                                fontSize={Metrics.ratio(14)}
                                color='#000'
                                fontWeight='normal'
                                title={ dateToBeShown?._year ? dateToBeShown?._year : year}
                            />
                        </TouchableOpacity>
                    </View>

                    <CustomText
                        style={{
                            width: Metrics.screenWidth * 0.8,
                            alignSelf: 'center', marginTop: Metrics.ratio(10),
                            marginTop: Metrics.ratio(10),
                        }}
                        fontSize={Metrics.ratio(14)}
                        color='#000'
                        fontWeight='normal'
                        title={'Zodiac'}
                    />
                    <View style={{
                        height: Metrics.ratio(50),
                        borderWidth: Metrics.ratio(1),
                        borderColor: '#CC2D3A',
                        borderRadius: Metrics.ratio(11),
                        width: Metrics.screenWidth * 0.8,
                        alignSelf: 'center',
                        marginTop: Metrics.ratio(10),
                    }}>
                        <TextInput editable={false} value={_zodiac} onChangeText={(text) => setZodiac(text)} style={{ color: '#000' }} />
                    </View>

                </View>

                <View style={{ justifyContent: 'flex-end', height: Metrics.screenHeight * 0.2 }}>
                    <Button
                        onPress={() => handleErrors()}
                        height={Metrics.ratio(50)}
                        width={Metrics.screenWidth * 0.8}
                        fontSize={Metrics.ratio(15)}
                        title='NEXT'
                        style={{ alignSelf: 'center', marginTop: Metrics.ratio(15), marginBottom: Metrics.ratio(20) }}
                        radius={Metrics.ratio(11)}
                    />




                    <View style={{
                        // flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>


                        <CustomText
                            // style={{ marginLeft: 10 }}
                            fontSize={Metrics.ratio(15)}
                            color='rgba(46, 46, 46, 0.5)'
                            // fontWeight='normal'
                            title={'Already have an account?'}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <CustomText
                                style={{ marginLeft: Metrics.ratio(10) }}
                                fontSize={Metrics.ratio(16)}
                                color={Colors.primary}
                                fontWeight='bold'
                                title={'LOGIN'}
                            />
                        </TouchableOpacity>
                    </View>
                    <Image style={{

height: Metrics.screenHeight * 0.07,
                        width: Metrics.screenWidth * 0.6,
                        alignSelf: 'center',
                        marginTop: Metrics.ratio(10), bottom: 0
                    }}
                        source={require('../../assets/images/logo.png')}
                        resizeMode='stretch'
                    />
                </View>
            </ScrollView>
        </View>
    )
}
