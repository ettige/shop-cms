'use client'
import { signIn, } from 'next-auth/react';
import React, { useState, ChangeEvent, FormEvent } from 'react';
interface FormState {
    email: string;
    password: string;
}

export const SignIn = () => {
    const [form, setForm] = useState<FormState>({
        email: "",
        password: ""
    });

    const formChange = (event: ChangeEvent<HTMLFormElement>) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }

    const formSubmit = (event: FormEvent) => {
        event.preventDefault(); // Prevent the default form submission behavior
        signIn("credentials", { email: form.email, password: form.password });
    }
    return (

            <div>
                <div>You&apos;re not Sign In</div>
                <div className='flex flex-col gap-2'>
                    <button className='btn btn-wide btn-neutral' onClick={() => signIn('github')}>Github</button>
                    <button className='btn btn-wide bg-indigo-700 hover:bg-indigo-600' onClick={() => signIn('discord')}>Discord</button>
                </div>
                <form className='text-start flex flex-col gap-2' onChange={formChange}>
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
                </form>
            </div>

    )
}
export default SignIn