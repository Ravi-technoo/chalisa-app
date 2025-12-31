import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      app: {
        title: 'Hanuman Chalisa App',
      },
      nav: {
        home: 'Home',
        content: 'Content',
        profile: 'Profile',
        logout: 'Logout',
      },
      home: {
        welcome: 'Welcome',
        playNow: 'Play Now',
        readNow: 'Read Now',
      },
      auth: {
        phoneNumber: 'Mobile Number',
        otp: 'OTP',
        resendOTP: 'Resend OTP',
        login: 'Login',
        logout: 'Logout',
      },
      content: {
        chalisa: 'Chalisa',
        aarti: 'Aarti',
        ramayan: 'Ramayan',
        mahabharat: 'Mahabharat',
      },
      profile: {
        myProfile: 'My Profile',
        phone: 'Phone Number',
        role: 'Role',
        unlockStatus: 'Unlock Status',
        name: 'Name',
        language: 'Language Preference',
        updateProfile: 'Update Profile',
      },
      payment: {
        unlockPremium: 'Unlock Premium Content',
        unlocked: 'Premium Unlocked',
      },
    },
  },
  hi: {
    translation: {
      app: {
        title: 'हनुमान चालीसा ऐप',
      },
      nav: {
        home: 'होम',
        content: 'सामग्री',
        profile: 'प्रोफ़ाइल',
        logout: 'लॉगआउट',
      },
      home: {
        welcome: 'स्वागत है',
        playNow: 'अभी सुनें',
        readNow: 'अभी पढ़ें',
      },
      auth: {
        phoneNumber: 'मोबाइल नंबर',
        otp: 'ओटीपी',
        resendOTP: 'ओटीपी पुनः भेजें',
        login: 'लॉगिन',
        logout: 'लॉगआउट',
      },
      content: {
        chalisa: 'चालीसा',
        aarti: 'आरती',
        ramayan: 'रामायण',
        mahabharat: 'महाभारत',
      },
      profile: {
        myProfile: 'मेरी प्रोफ़ाइल',
        phone: 'फ़ोन नंबर',
        role: 'भूमिका',
        unlockStatus: 'अनलॉक स्थिति',
        name: 'नाम',
        language: 'भाषा प्राथमिकता',
        updateProfile: 'प्रोफ़ाइल अपडेट करें',
      },
      payment: {
        unlockPremium: 'प्रीमियम सामग्री अनलॉक करें',
        unlocked: 'प्रीमियम अनलॉक किया गया',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'hi', // Default to Hindi
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
