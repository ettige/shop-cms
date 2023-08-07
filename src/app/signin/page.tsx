import SingIn from '@/app/components/SignIn'
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/utils/authOptions';
import { redirect } from 'next/navigation';

export default async function Page({ searchParams }: { searchParams: { callbackUrl: string } }) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(searchParams.callbackUrl ? searchParams.callbackUrl : "/")
  }
  return (
    <main className="container text-center items-center justify-center flex h-screen">
      {searchParams.callbackUrl ? <div className="alert alert-warning absolute top-3 w-auto line-clamp-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span>You need to login to access this page</span>
      </div> : <span></span>}
      <SingIn />
    </main >
  );
}