'use client'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Account() {
    const { data: session } = useSession()

    return (
        <main className="container text-center justify-center flex">
            {session ?
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={session?.user?.image as string | undefined} alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{session?.user?.name}</h2>
                        <h2 className="card-actions">{session?.user?.email}</h2>
                        <button className='text-error' onClick={() => signOut()}>signOut</button>
                    </div>
                </div> :
                <div>
                    <div>Youre not signIn</div>
                    <button className='text-success' onClick={() => signIn()}>signIn</button>
                </div>

            }
        </main>
    )
}
