import { getServerSession } from 'next-auth';
import authOptions from '@/lib/utils/authOptions';
import { SignOut } from './components/SignOut';
import Link from 'next/link';
export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <main className="container text-center justify-center flex">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="avatar px-10 pt-10">
            <img src={session?.user?.image as string | undefined} alt="UserAvatar" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{session?.user?.name}</h2>
            <h2 className="card-actions">{session?.user?.email}</h2>
            <SignOut />
          </div>
        </div>
      </main>
    )
  }
  else {
    return (
      <main className="container text-center items-center justify-center flex h-screen">
        You must <Link href="/signin" className='btn btn-ghost'>Signin </Link>
      </main>
    )
  }
}