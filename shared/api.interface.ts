/* 前后端共享的类型定义 */

export interface CompanyInfo {
  company_name: string;
  company_slogan: string;
  company_description: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  footer_copyright: string;
  [key: string]: string;
}

export interface Product {
  id: string;
  productKey: string;
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  imageUrl: string;
  tags: string[];
  iconName: string;
  displayOrder: number;
}

export interface ProjectCase {
  id: string;
  title: string;
  industry: string;
  imageUrl: string;
  displayOrder: number;
}

export interface ClientCase {
  id: string;
  clientName: string;
  projectName: string;
  serviceContent: string;
  resultDesc: string;
  imageUrl: string;
  industry: string;
  displayOrder: number;
}

export interface Timeline {
  id: string;
  year: string;
  title: string;
  description: string;
  displayOrder: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  displayOrder: number;
}

export interface Event {
  id: string;
  title: string;
  posterUrl: string;
  eventDate: string | null;
  eventTime: string | null;
  location: string | null;
  meetingInfo: string | null;
  contactInfo: string | null;
  isActive: boolean;
}

export interface NavMenu {
  id: string;
  label: string;
  href: string;
  displayOrder: number;
  isActive: boolean;
}

export interface AllContentResponse {
  companyInfo: CompanyInfo;
  products: Product[];
  projectCases: ProjectCase[];
  clientCases: ClientCase[];
  timeline: Timeline[];
  services: ServiceItem[];
  activeEvent: Event | null;
  navMenus: NavMenu[];
}
