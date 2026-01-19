import Wrapper from '@/src/components/wrapper'
import React from 'react'

export default function NavBar() {
    return (

        <nav className='py-[2.4rem] bg-white border-b-[.1rem] border-b-grey-100 fixed top-0 left-0 w-full z-40'>
            <Wrapper>
                <h1 className='font-playfair font-bold text-xl text-primary'>ReviewX</h1>
            </Wrapper >
        </nav>
    )
}
