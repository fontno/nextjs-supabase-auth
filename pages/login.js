import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() { 
    const supabaseClient = useSupabaseClient()

    const [loading, setLoading] = useState(false)
    const [registering, setRegistering] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    function toggle() { 
        setRegistering(x => !x)
    }

    async function handleSubmit(event) { 
        event.preventDefault()
        setError('')
        setLoading(true)

        if (registering) { 
            const { data, error } = await supabaseClient.auth.signUp({
                email: event.target.emailAddress.value,
                password: event.target.userPassword.value,
                // options: { 
                //     data: {  

                //     }
                // },
            })

            if (error) { 
                console.log(error)
                setError(error.message)
            }
            if (data) { 
                console.log(data)
                router.push('/')
            }
        } else { 
            const { data, error } = await supabaseClient.auth.signInWithPassword({ 
                email: event.target.emailAddress.value,
                password: event.target.userPassword.value,
            })
            
            if (error) { 
                console.log(error)
                setError(error.message)
            }
            if (data) { 
                console.log(data)
                router.push('/')
            }
        }
        
        setLoading(false)
    }
    return ( 
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            { registering ? 'Sign up' : 'Sign in to your account' }
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="emailAddress" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="bg-white mt-2">
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  required
                  className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="userPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  
                  <Link href={'/forgot-password'} className="font-semibold text-indigo-600 hover:text-indigo-500">
                    { registering ? '' : 'Forgot password?' }
                  </Link>
                </div>
              </div>
              <div className="bg-white mt-2">
                <input
                  id="userPassword"
                  name="userPassword"
                  type="password"
                  required
                  className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
                { 
                    registering ? ( 
                        <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        { loading ? '...Signing up' : 'Sign up' }
                        </button>
                    ) : ( 
                        <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        { loading ? '...Signing in' : 'Sign in' }
                        </button>
                    )
                }
               
            </div>
          </form>
            
          <div>  
            { 
                registering ? ( 
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <button onClick={toggle}>
                            <span className="font-bold text-indigo-500">Sign in here</span>
                        </button>
                        
                    </p>
                ) : ( 
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <button onClick={toggle}>
                            <span className="font-bold text-indigo-500">sign up here</span>
                        </button>
                    
                    </p>
                )
            }

            </div>

            <p className="mt-10 text-center text-sm text-red-900">{error}</p>
        
        </div>
        </div>
        </>
    )
}