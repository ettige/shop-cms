'use client'
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormState {
  email: string;
  password: string;
}

export default function Home() {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: ""
  });

  const { data: session, status, update } = useSession();

  const formChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  const formSubmit = (event: FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    signIn("credentials", { email: form.email, password: form.password });
  }
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
          <div>You&apos;re not Sign In</div>
          <div className='flex flex-col gap-2'>
            <button className='btn btn-wide btn-neutral' onClick={() => signIn('github')}>Github</button>
            <button className='btn btn-wide bg-indigo-700 hover:bg-indigo-600' onClick={() => signIn('discord')}>Discord</button>
          </div>
          <div onChange={formChange}>
            <div className="input-group-sm flex flex-col">
              <label htmlFor="email">Email</label>
              <input placeholder='me@ex.ample' type="email" name='email' className="input-sm input-accent" />
            </div>
            <div className="input-group-sm flex flex-col">
              <label htmlFor="password">password</label>
              <input type="password" name='password' className="input-sm input-accent" />
            </div>
            <div>
              <button className="btn btn-wide" onClick={formSubmit}>Sign In</button>
            </div>
          </div>
        </div>
      </main>
    )
  }
}