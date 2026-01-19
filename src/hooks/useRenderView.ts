import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useRenderView = <T extends string>({
  tabQueryName = "tab",
  defaultTab,
}: {
  tabQueryName?: string;
  defaultTab: T;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const tab = (
    !searchParams.get(tabQueryName)
      ? defaultTab
      : searchParams.get(tabQueryName)
  ) as T;

  const setTab = (tab: T) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(tabQueryName, tab);
    return router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return [tab, setTab] as const;
};
