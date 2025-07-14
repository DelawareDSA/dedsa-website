export interface JoinHeroContent {
  title: string;
  subtitle: string;
}

export interface WhyJoinDsaContent {
  heading: string;
  items: Array<{
    title: string;
    icon: string;
    description: string;
  }>;
}

export interface TestimonialsContent {
  heading: string;
  testimonials: Array<{
    quote: string;
    author: string;
    year: string;
  }>;
}

export interface MembershipOptionsContent {
  dsaMembership: {
    title: string;
    subtitle: string;
    benefits: string[];
    buttonText: string;
    buttonUrl: string;
  };
  duesWaiver: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    buttonText: string;
    buttonUrl: string;
  };
}

export interface FAQContent {
  heading: string;
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export interface JoinPageContent {
  joinHero: JoinHeroContent;
  whyJoinDSA: WhyJoinDsaContent;
  testimonials: TestimonialsContent;
  membershipOptions: MembershipOptionsContent;
  faq: FAQContent;
}
