import { GET_RESTAURANT_DATA } from '../actions/types';

const initialState = {
  social_name: '',
  social_email: '',
  social_profile_image: '',
  social_id: '',
  social_type: '',
  full_name: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  country_of_residence: '',
  nationality: '',
  gender: '',
  date_of_birth: '',
  zodiac: '',
  hobbies: '',
  bio: '',
  vote_bucket: '',
  video_path: '',
  image_gallery: [],
  nominations: [],
  isLoggedIn: false,
  userData: null,
  dateToBeShown: null,
  token:'',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'social_name':
      return {
        ...state,
        social_name: action.payload,
      };
      break;
    case 'social_email':
      return {
        ...state,
        social_email: action.payload,
      };
      break;
    case 'social_profile_image':
      return {
        ...state,
        social_profile_image: action.payload,
      };
      break;

    case 'social_id':
      return {
        ...state,
        social_id: action.payload,
      };
      break;
    case 'social_type':
      return {
        ...state,
        social_type: action.payload,
      };
      break;
    case 'full_name':
      return {
        ...state,
        full_name: action.payload,
      };
      break;
    case 'username':
      return {
        ...state,
        username: action.payload,
      };
      break;
    case 'email':
      return {
        ...state,
        email: action.payload,
      };
      break;
    case 'phone':
      return {
        ...state,
        phone: action.payload,
      };
      break;
    case 'password':
      return {
        ...state,
        password: action.payload,
      };
      break;
    case 'country_of_residence':
      return {
        ...state,
        country_of_residence: action.payload,
      };
      break;
    case 'nationality':
      return {
        ...state,
        nationality: action.payload,
      };
      break;
    case 'gender':
      return {
        ...state,
        gender: action.payload,
      };
      break;
    case 'date_of_birth':
      return {
        ...state,
        date_of_birth: action.payload,
      };
      break;
    case 'zodiac':
      return {
        ...state,
        zodiac: action.payload,
      };
      break;
    case 'hobbies':
      return {
        ...state,
        hobbies: action.payload,
      };
      break;
    case 'bio':
      return {
        ...state,
        bio: action.payload,
      };
      break;
    case 'vote_bucket':
      return {
        ...state,
        vote_bucket: action.payload,
      };
      break;
    case 'video_path':
      return {
        ...state,
        video_path: action.payload,
      };
      break;
    case 'nominations':
      return {
        ...state,
        nominations: action.payload,
      };
      break;
    case 'image_gallery':
      return {
        ...state,
        image_gallery: action.payload,
      };
      break;
    case 'isLoggedIn':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
      break;
    case 'userData':
      return {
        ...state,
        userData: action.payload,
      };
      break;
      case 'dateToBeShown':
      return {
        ...state,
        dateToBeShown: action.payload,
      };
      break;
      case 'token':
      return {
        ...state,
        token: action.payload,
      };
      break;
    default:
      return state;
  }
}
