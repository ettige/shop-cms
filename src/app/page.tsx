'use client'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {
  const { data: session, status, update } = useSession()

  if (status == "authenticated") {
    return (
      <main className="container text-center justify-center flex">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src={session?.user?.image as string | undefined} alt="UserAvatar" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{session?.user?.name}</h2>
            <h2 className="card-actions">{session?.user?.email}</h2>
            <button className='text-error' onClick={() => signOut()}>signOut</button>
          </div>
        </div>
      </main>
    )

  }
  else if (status == "loading") {
    return (
      <main className="container text-center items-center justify-center flex h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </main>
    )
  }
  else {
    return (
      <main className="container text-center items-center justify-center flex h-screen">
        <div>
          <div>You're not Sign In</div>
          <div className='flex flex-col gap-2'>
            <button className='btn btn-wide btn-neutral' onClick={() => signIn('github')}>Github</button>
            <button className='btn btn-wide bg-indigo-700 hover:bg-indigo-600' onClick={() => signIn('discord')}>Discord</button>
          </div>
        </div>
      </main>
    )
  }
}