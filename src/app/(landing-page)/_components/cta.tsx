// "use client"
// import { Button } from "@/src/components/button";
// import { ROUTES } from "@/src/utils/routes";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function Cta() {
//     const router = useRouter();
//     return (
//         <section className="grid grid-cols-1 md:grid-cols-2 items-center pt-[7rem] pb-0 md:pt-[12.3rem] md:pb-[7rem] gap-y-[4rem] md:gap-y-[0] gap-x-[12.3rem]">
//             <div>
//                 <Image src="/cta-image.png" alt="cta-image" width={900} height={900} />
//             </div>
//             <div className="max-w-[70rem] space-y-[1.6rem]">
//                 <header className="text-black space-y-[1.2rem] text-center flex flex-col justify-center items-center md:items-start md:justify-start md:text-start">
//                     <h1 className="font-bold text-[3rem] md:text-[5rem] font-playfair leading-[3rem] md:leading-[5.5rem]">Authentic Local Voices That Build Trust</h1>
//                     <p className="leading-snug">We use a smart matching system that helps your business get discovered by real people within your local area who are actively engaging with businesses like yours.</p>

//                     <p className="leading-snug">By focusing on geographic relevance and genuine customer experiences, our system increases the chances of receiving authentic, locally relevant feedback that strengthens trust and improves how your business appears to future customers.</p>
//                     <Button onClick={()=> router.push(ROUTES.calendly)}>Book A Call</Button>
//                 </header>
//             </div>
//         </section>
//     )
// }
