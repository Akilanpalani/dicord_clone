'use client';
import Link from 'next/link';
export default function HomePage() {
  return (
    <div>
      <div className='text-center text-white'>
        <h1 className='text-5xl font-semibold'>Imagine a Discord bot...</h1>
        <p className='mt-5 text-xl'>
          ...where you can belong to a school club, a gaming group, or a
          worldwide art community. Where just you and a handful of friends can
          spend time together. A place that makes it easy to talk every day and
          hang out more often.
        </p>
      </div>
      <div className='mt-10 flex items-center justify-center flex-col'>
        <p className='text-xl mb-5'>
          Click the below button to register and start using Discord Bot
        </p>
        <Link href='/signup'>
          <button className='bg-white font-semibold hover:text-[#404EED] rounded-full p-2 hover:drop-shadow-2xl transition-transform'>
            Click here
          </button>
        </Link>
      </div>
    </div>
  );
}
