'use client'

import {signIn, signOut} from 'next-auth/react'

export default function LoginBtn(){
    return(
        <button style={{height : 'auto', width: 'auto'}} onClick={()=> signIn()}>로그인</button>
    )
}