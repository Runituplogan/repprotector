export interface Policy {
  id: number;
  title: string;
  url: PolicyPage;
}

export type PolicyPage =
  | "privacy-policy"
  | "terms-of-services"
  | "cookie-policy"
  | "disclaimer"
  | "refund-and-cancellation-policy"
  | "service-level-agreement-policy";
