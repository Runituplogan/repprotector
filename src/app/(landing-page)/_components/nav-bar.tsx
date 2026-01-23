import Wrapper from '@/src/components/wrapper'
import Image from 'next/image'
import React from 'react'

export default function NavBar() {
    return (

        <nav className='py-[2rem] bg-white border-b-[.1rem] border-b-grey-100 overflow-hidden fixed top-0 left-0 w-full z-40'>
            <Wrapper>
                <div className="relative w-[1500px] ">
                    <Image
                        src="/rep-protector.png"
                        alt='RepProtector Logo 1'
                        height={150}
                        width={150}
                        sizes="150px"
                        priority={true}
                    />
                </div>
            </Wrapper >
        </nav>
    )
}
