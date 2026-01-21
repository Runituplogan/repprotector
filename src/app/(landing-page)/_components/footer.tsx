"use client";
export default function Footer() {
  return (
    <footer className="w-full bg-light-background py-[2.4rem] text-center text-base font-medium text-grey-600">
      © {new Date().getFullYear()} RepProtector, All Rights Reserved.
    </footer>
  );
}
