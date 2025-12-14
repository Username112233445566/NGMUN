// types/faq.ts
export interface FAQItem {
  q: string;
  a: string;
}

export interface ContactPerson {
  name: string;
  position: string;
  telegram: string;
  email: string;
}

export interface GeneralContact {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}