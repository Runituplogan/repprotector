import { PolicyPage } from "../_types";


const root = "/policy-pages";

export const PRIVACY_POLICY_ROUTES = {
  root,
  getPolicyPage: (page: PolicyPage) => `/${page}`,
} as const;
