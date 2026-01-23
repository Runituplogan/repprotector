import { ComponentType } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Policy } from "../_types";
import { policies } from "../_data";
import Wrapper from "@/src/components/wrapper";
import PrivacyPolicy from "./_components/privacy-policy";
import PolicyTitle from "./_components/policy-title";
import TermsOfService from "./_components/terms-of-service";
import CookiePolicy from "./_components/cookie-policy";
import Disclaimer from "./_components/disclaimer";
import RefundPolicy from "./_components/refund-and-cancellation-policy";
import ServiceLevelAgreement from "./_components/service-level-agreement";
import Footer from "../../_components/footer";
import { formatTab } from "@/src/utils";

const policyLayouts: Record<string, ComponentType<{ policy: Policy }>> = {
  "privacy-policy": PrivacyPolicy,
  "terms-of-services": TermsOfService,
  "cookie-policy": CookiePolicy,
  "disclaimer": Disclaimer,
  "refund-and-cancellation-policy": RefundPolicy,
  "service-level-agreement-policy": ServiceLevelAgreement,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const policy = policies.find(
    (policy) => policy.url === slug || policy.url.endsWith(`/${slug}`),
  );

  if (!policy) {
    return {
      title: "Policy Not Found",
    };
  }

  return {
    title: policy.title,
  };
}


export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const policy = policies.find(
    (policy) => policy.url === slug || policy.url.endsWith(`/${slug}`),
  );

  if (!policy) {
    notFound();
  }

  const PolicyLayout = policyLayouts[policy.url];

  if (!PolicyLayout) {
    return (
      <section>
        <h2>Page Not Found</h2>
      </section>
    );
  }

  return (
    <>
      <Wrapper className="no-scrollbar flex h-full flex-col gap-[3.2rem] py-[3.6rem] !max-w-[113rem] pt-[5.2rem] text-grey-600">
        <PolicyTitle title={formatTab(policy.title)} />
        <PolicyLayout policy={policy} />
      </Wrapper>
      <Footer />
    </>
  );
}