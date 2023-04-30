export interface breadFormat {
  back: boolean;
  category: string;
  first?: breadLinkDetails;
  second?: breadLinkDetails;
}
export interface breadLinkDetails {
    name: string;
    link?: string;
    active?: boolean;
}