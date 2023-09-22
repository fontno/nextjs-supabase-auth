import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const user = useUser()
    const supabaseClient = useSupabaseClient() 
    const router = useRouter()

    useEffect(() => { 
        function loadProfile() { 
            console.log('PROFILE: ', user)
        }

        if (user) { 
            loadProfile()
        } else { 
            router.push('/login')
        }

    }, [user])

    return ( 
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>

            <div> 
                <h1>Welcome {user ? user.email : ''}</h1>
                <button
                    className='' 
                    onClick={async () => {
                        await supabaseClient.auth.signOut()
                        router.push('/login')
                    }}
                >
                    Logout
                </button>
            </div>
        </main>
    )
}
