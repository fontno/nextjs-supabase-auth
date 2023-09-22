import { useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

export default function ForgotPassword() { 
    const supabaseClient = useSupabaseClient()
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState('')

    async function handlePasswordResetInstructions(event) { 
        event.preventDefault()
        setError('')
        setLoading(true)

        const { data, error } = await supabaseClient.auth.resetPasswordForEmail(
            event.target.emailAddress.value,
            { redirectTo: '/password-reset'},
        )
        if (error) { 
            console.log(error)
            setError(error.message)
        }
        if (data) { 
            console.log(data)
        }
        setLoading(false)
        setSent(true)
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
            Email To Reset Password
        </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handlePasswordResetInstructions} className="space-y-6">
            <div>
            <label htmlFor="emailAddress" className="block text-sm font-medium leading-6 text-gray-900">
                Enter your email address  
            </label>
            <div className="mt-2">
                <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            </div>

            <div>
            <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                {loading ? '...Sending' : 'Send reset password instructions' }
            </button>
            </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-900">
            {sent ? 'Check your email' : ''}
        </p>
        <p className="mt-10 text-center text-sm text-red-900">{error}</p>
        </div>
        </div>
        </>
    )
}