export enum I18n {
  en = 'en_US',
  id = 'id_ID',
  vn = 'vn_VN'
}

export type I18nLocales = keyof typeof I18n;

export interface Portfolio {
  name: string;
  category: string;
  description: string;
  github?: string;
  link?: string;
  image: string;
  stacks: string[];
  isActive?: boolean;
  year: number;
}
