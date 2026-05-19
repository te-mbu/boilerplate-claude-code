export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: NavItem[];
}
