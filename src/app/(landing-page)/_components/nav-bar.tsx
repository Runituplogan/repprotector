import Wrapper from '@/src/components/wrapper'
import Image from 'next/image'
import React from 'react'

export default function NavBar() {
    return (

        <nav className='py-[2rem] bg-white border-b-[.1rem] border-b-grey-100 overflow-hidden fixed top-0 left-0 w-full z-40'>
            <Wrapper>
                <div className="relative w-[200px] ">
                    <Image
                        src="/RepProtector Logo 1.png"
                        alt='RepProtector Logo 1'
                        height={200}
                        width={200}
                        sizes="200px"
                        priority={true}
                    />
                </div>
            </Wrapper >
        </nav>
    )
}
