import footer from '../content/layout/footer.json';
import header from '../content/layout/header.json';
import about from '../content/pages/about.json';
import bylaws from '../content/pages/bylaws.json';
import calendar from '../content/pages/calendar.json';
import committees from '../content/pages/committees.json';
import contact from '../content/pages/contact.json';
import handbook from '../content/pages/handbook.json';
import home from '../content/pages/home.json';
import join from '../content/pages/join.json';
import leadership from '../content/pages/leadership.json';
import newsletter from '../content/pages/newsletter.json';
import udYdsa from '../content/pages/ud-ydsa.json';
import whatWeStandFor from '../content/pages/what-we-stand-for.json';

const pageContent = {
  about,
  home,
  join,
  calendar,
  contact,
  leadership,
  newsletter,
  bylaws,
  handbook,
  committees,
  whatWeStandFor,
  udYdsa,
};

const componentContent = {
  header,
  footer,
};

export const contentService = {
  getPageContent: (pageName: keyof typeof pageContent) => {
    return pageContent[pageName];
  },

  getComponentContent: (componentName: keyof typeof componentContent) => {
    return componentContent[componentName];
  },
};
