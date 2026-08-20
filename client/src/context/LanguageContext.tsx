import React, { createContext, useContext, useState } from 'react';
import { LanguageCode } from '../types/index.ts';

interface Translations {
  [key: string]: {
    or: string;
    en: string;
  };
}

export const DICTIONARY: Translations = {
  appName: { or: 'ଖେଳ ବିଦ୍ୟା', en: 'Khelo Vidya' },
  tagline: { or: 'ଶିଖିବା ଏବେ ଆନନ୍ଦମୟ ଏବଂ ସହଜ', en: 'Gamified Offline STEM Learning' },
  online: { or: 'ଅନଲାଇନ୍', en: 'Online' },
  offline: { or: 'ଅଫଲାଇନ୍ (ସୁରକ୍ଷିତ)', en: 'Offline (Active)' },
  login: { or: 'ପ୍ରବେଶ କରନ୍ତୁ', en: 'Log In' },
  register: { or: 'ନୂଆ ଖାତା ଖୋଲନ୍ତୁ', en: 'Register' },
  logout: { or: 'ଲଗ୍ ଆଉଟ୍', en: 'Log Out' },
  username: { or: 'ଇମେଲ୍ କିମ୍ବା ୟୁଜରନେମ୍', en: 'Username or Email' },
  password: { or: 'ପାସୱାର୍ଡ', en: 'Password' },
  fullName: { or: 'ସମ୍ପୂର୍ଣ୍ଣ ନାମ', en: 'Full Name' },
  role: { or: 'ଭୂମିକା', en: 'Role' },
  student: { or: 'ଛାତ୍ର / ଛାତ୍ରୀ (Student)', en: 'Student' },
  teacher: { or: 'ଶିକ୍ଷକ / ଶିକ୍ଷୟିତ୍ରୀ (Teacher)', en: 'Teacher' },
  grade: { or: 'ଶ୍ରେଣୀ (Grade)', en: 'Grade' },
  school: { or: 'ବିଦ୍ୟାଳୟ', en: 'School' },
  selectSchool: { or: 'ନିଜ ବିଦ୍ୟାଳୟ ବାଛନ୍ତୁ', en: 'Select your school' },
  welcome: { or: 'ସ୍ୱାଗତ', en: 'Welcome' },
  startLearning: { or: 'ପାଠ ଆରମ୍ଭ କରନ୍ତୁ', en: 'Start Learning' },
  myProgress: { or: 'ମୋର ପ୍ରଗତି', en: 'My Progress' },
  badges: { or: 'ଅର୍ଜିତ ବ୍ୟାଜ୍', en: 'Badges Earned' },
  offlineReady: { or: 'ଏହି ପାଠଟି ଅଫଲାଇନରେ ଉପଲବ୍ଧ', en: 'Available Offline' },
  syncStatus: { or: 'ଡାଟା ସମନ୍ୱୟ ସ୍ଥିତି', en: 'Sync Status' },
  noPendingSyncs: { or: 'ସମସ୍ତ ତଥ୍ୟ ସୁରକ୍ଷିତ ଏବଂ ଅପଡେଟ୍ ଅଛି', en: 'All records in sync' },
  pendingAttempts: { or: 'ସମନ୍ୱୟ ଅପେକ୍ଷାରେ ଅଛି', en: 'Attempts pending sync' },
  teacherDashboard: { or: 'ଶିକ୍ଷକ ଡ୍ୟାସବୋର୍ଡ', en: 'Teacher Dashboard' },
  classAnalytics: { or: 'ଶ୍ରେଣୀ ପ୍ରଦର୍ଶନ ବିଶ୍ଳେଷଣ', en: 'Class Performance Overview' },
  lessons: { or: 'ପାଠ୍ୟଖସଡ଼ା (Lessons)', en: 'STEM Lessons' },
  topics: { or: 'ବିଷୟବସ୍ତୁ (Topics)', en: 'Topics' },
  allSubjects: { or: 'ସମସ୍ତ ବିଷୟ', en: 'All Subjects' },
  allGrades: { or: 'ସମସ୍ତ ଶ୍ରେଣୀ', en: 'All Grades' },
  startQuiz: { or: 'କୁଇଜ୍ ଆରମ୍ଭ କରନ୍ତୁ', en: 'Start Quiz' },
  takeQuiz: { or: 'କୁଇଜ୍ ଅଭ୍ୟାସ କରନ୍ତୁ', en: 'Take Quiz' },
  downloadOffline: { or: 'ଅଫଲାଇନ୍ ସେଭ୍ କରନ୍ତୁ', en: 'Save for Offline' },
  cachedReady: { or: 'ଅଫଲାଇନ୍ ସଞ୍ଚିତ', en: 'Cached Offline' },
  score: { or: 'ସ୍କୋର', en: 'Score' },
  points: { or: 'ପଏଣ୍ଟ୍', en: 'Points' },
  mastery: { or: 'ଦକ୍ଷତା ସ୍ତର', en: 'Mastery Level' },
  completed: { or: 'ସମ୍ପୂର୍ଣ୍ଣ', en: 'Completed' },
  nextQuestion: { or: 'ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ', en: 'Next Question' },
  prevQuestion: { or: 'ପୂର୍ବ ପ୍ରଶ୍ନ', en: 'Previous' },
  submitQuiz: { or: 'କୁଇଜ୍ ଦାଖଲ କରନ୍ତୁ', en: 'Submit Quiz' },
  quizResults: { or: 'କୁଇଜ୍ ଫଳାଫଳ', en: 'Quiz Results' },
  accuracy: { or: 'ସଠିକତା', en: 'Accuracy' },
  backToLessons: { or: 'ପାଠ୍ୟସୂଚୀକୁ ଫେରନ୍ତୁ', en: 'Back to Lessons' },
  reviewAnswers: { or: 'ଉତ୍ତର ସମୀକ୍ଷା', en: 'Review Answers' },
  funFact: { or: 'ମଜାଦାର ତଥ୍ୟ', en: 'Did You Know?' },
  realWorldContext: { or: 'ଓଡ଼ିଶା ପ୍ରସଙ୍ଗ', en: 'Odisha Real-World Context' },
  keyPoints: { or: 'ମୁଖ୍ୟ ବିନ୍ଦୁ', en: 'Key Concepts' },
  summary: { or: 'ସାରାଂଶ', en: 'Summary' },
  newBadgeUnlocked: { or: 'ନୂତନ ବ୍ୟାଜ୍ ଅର୍ଜିତ!', en: 'New Badge Unlocked!' },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: keyof typeof DICTIONARY) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return (localStorage.getItem('khelo_vidya_lang') as LanguageCode) || 'or';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('khelo_vidya_lang', lang);
  };

  const t = (key: keyof typeof DICTIONARY): string => {
    const item = DICTIONARY[key];
    if (!item) return String(key);
    return item[language] || item.en || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
