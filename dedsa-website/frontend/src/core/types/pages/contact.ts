export interface ContactInfo {
  email: string;
  phone: string;
  mailingAddress: string;
}

export interface ContactPageContent {
  heading: string;
  fallbackContent: string;
  fallbackContactInfo: ContactInfo;
  sections: {
    getInTouch: {
      title: string;
      contactTypes: {
        email: { label: string };
        phone: { label: string };
        mailingAddress: { label: string };
      };
    };
    sendMessage: { title: string };
    followUs: {
      title: string;
      socialLinks: { name: string; url: string }[];
    };
  };
  error: { title: string; actionLabel: string };
}

export interface ContactFormContent {
  formFields: {
    name: { label: string; required: true; placeholder: string };
    email: { label: string; required: true; placeholder: string };
    subject: {
      label: string;
      required: false;
      placeholder: string;
      options: { value: string; label: string }[];
    };
    message: {
      label: string;
      required: true;
      placeholder: string;
      rows: number;
    };
  };
  buttons: { submit: string; sending: string };
  validation: { requiredFields: string };
  success: { title: string; message: string; buttonText: string };
  error: { general: string; title: string };
}
