export interface Service {
  id: string;
  sku: string;
  cat_id: string;
  title: string;
  images?: string[];
  variants?: Variant[];
  price?: number;
}
export interface FormattedService {
  id: string;
  sku: string;
  cat_id: string;
  title: string;
  images?: string[];
  variants?: Variant[];
}
export interface Category {
  id: string;
  sku: string;
  title: string;
  services?: Service[];
}
export interface Variant {
  id: string;
  svc_id: string;
  type: string;
  order: number;
  altVal?: AltVal;
  options?: Option[];
  images?: string[];
}
export interface VariantAlt extends Option {
  detailOrder?: number;
  altValue?: Array<string>;
} 


export interface Option {
  id: string;
  var_id: string;
  title: string;
  price: number,
  order: number,
  images?: string[];
}
export interface AltVal {
  true: string;
  false: string
}