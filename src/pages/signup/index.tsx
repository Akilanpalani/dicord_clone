'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  return(
    <div className='mx-auto rounded-lg bg-black text-white md:w-[500px] p-8 mt-6'>
    <h1 className='text-3xl font-bold text-start'>Sign In</h1>
    <form className='p-4'>
      <div className='my-3'>
        <input
          type='email'
          className='p-3 rounded-lg outline-none text-black w-full'
          placeholder='Email'
        />
      </div>
      <div>
        <input
          type='password'
          className='p-3 rounded-lg outline-none text-black w-full'
          placeholder='Password'
        />
      </div>
      <div className='my-3'>
        <button
          type='submit'
          className="p-3 rounded-lg outline-none text-white bg-[#404EED] w-full my-3 hover:cursor-pointer "
        >
          Sign In
        </button>
      </div>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <input type='checkbox' onChange={() => {}} checked />
          <label className='ml-2'>Remember Me</label>
        </div>
        <div className='text-[#404EED]'>
          <a href='/'>Need Help?</a>
        </div>
      </div>
    </form>
    <div className='flex flex-col items-start ml-4 mt-6'>
      <div className='flex items-start'>
        <p>
          New to Discord?{' '}
          <a href='/' className='text-white hover:text-[#404EED] underline'>
            Sign Up Now
          </a>
        </p>
      </div>
      <div className='flex items-start'>
        <p>
          This page is protected by Google reCAPTCHA to ensure you are not a
          bot.
          <a href='/' className='text-blue-600 hover:text-white underline'>
            {' '}
            Learn more
          </a>
        </p>
      </div>
    </div>
  </div>
  )
}