"use client";

import Link from "next/link";
import { policies } from "../(policy-pages)/_data";
import { PRIVACY_POLICY_ROUTES } from "../(policy-pages)/_utils/routes";
import Wrapper from "@/src/components/wrapper";


export default function Footer() {
  return (
    <footer id="footer" className="w-full flex flex-col gap-y-[3.2rem] border-b-[.1rem] border-b-primary items-center justify-center bg-light-background py-[2.4rem] text-center text-base font-medium text-grey-600">
      <Wrapper className="space-y-[3.2rem] text-start md:text-center">
        <ul className="flex w-full flex-col items-start justify-start md:justify-center md:items-center gap-y-[.8rem] md:gap-y-[0] md:gap-x-[5rem] md:flex-row">
          {
            policies.map((policy) => (
              <li key={policy.id}>
                <Link
                  href={`${PRIVACY_POLICY_ROUTES.getPolicyPage(policy.url)}`}
                >
                  {policy.title}
                </Link>
              </li>
            ))
          }
        </ul>
        <p> © {new Date().getFullYear()} RepProtector, All Rights Reserved.</p>
      </Wrapper>
    </footer>
  );
}
