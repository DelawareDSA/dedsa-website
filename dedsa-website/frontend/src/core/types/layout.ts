export interface FooterLink {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  organizationName: string;
  organizationDescription: string;
  copyright: string;
  privacyPolicy: string;
  socialLinks: SocialLink[];
  sections: FooterSection[];
}

export interface HeaderContent {
  siteName: string;
  joinButtonText: string;
  navItems: Array<{
    name: string;
    href: string;
  }>;
}
