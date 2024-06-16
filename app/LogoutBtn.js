'use client'

import {signOut} from 'next-auth/react'

export default function LogoutBtn(){
    return(
        <button onClick={()=> signOut()} style={{marginLeft : '10px'}}>로그아웃</button>
    )
}