import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <section className="flex min-h-screen w-full flex-col justify-center px-6 text-white md:px-[9vw]">
      <div className="mb-12 flex w-fit items-center justify-center space-x-1 rounded-lg border border-blue-100 px-[10px] py-1 md:mb-4">
        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-100">
          <span className="h-[6px] w-[6px] rounded-full bg-blue-100" />
        </div>
        <p className="text-base font-medium text-blue-100">404 error</p>
      </div>
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="order-2 flex-1 md:order-1">
          <h1 className="text-primary mb-6 text-4xl font-bold md:text-6xl">
            Uh oh, we can&apos;t find that page...
          </h1>
          <h3 className="text-lg md:max-w-[90%] md:text-xl">
            Sorry, the page you are looking for doesn&apos;t exist or has been
            moved.
          </h3>
          <div className="my-12 flex flex-col gap-4 md:flex-row">
            {/* <BackButton /> */}
            <Link
              className="bg-primary hover:bg-sidebar flex items-center justify-center gap-[1rem] rounded-[0.7rem] bg-grey-700 px-[1.94rem] py-[1.3rem] text-center text-base font-bold leading-[2.32rem] text-white md:text-lg"
              href="/"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
