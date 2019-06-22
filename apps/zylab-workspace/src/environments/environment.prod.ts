declare const API_KEY_FIREBASE_PRODUCTION: string;

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: API_KEY_FIREBASE_PRODUCTION,
    authDomain: 'zylab-prod.firebaseapp.com',
    databaseURL: 'https://zylab-prod.firebaseio.com',
    projectId: 'zylab-prod',
    storageBucket: '',
    messagingSenderId: '547383712542',
    appId: '1:547383712542:web:f6d65aa47e740c82'
  }
};
