"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SigninForm } from '@/components/forms/signin-form'
import { ModeToggle } from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton';
export const SignIn = ({ searchParams }: { searchParams: { callbackUrl: string } }) => {
    const router = useRouter()
    const { status } = useSession()

    if (status === "authenticated")
        router.replace(searchParams.callbackUrl || "/")

    return <main className='flex justify-center items-center h-screen'>
        {status === "loading" ?

            <Card>
                <CardHeader>
                    <ModeToggle />
                    <CardTitle>
                        <Skeleton className="h-6 w-16" />
                    </CardTitle>
                    <CardDescription>            <Skeleton className="h-2 w-80" />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-12" />
                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <div className="mx-4 mb-0 text-center font-semibold dark:text-white">
                            یا
                        </div>
                    </div>
                    <Skeleton className="h-5" />
                </CardContent>
            </Card> :
            <Card>
                <CardHeader>
                    <ModeToggle />
                    <CardTitle>ثبت نام</CardTitle>
                    <CardDescription>برای دسترسی به محتوای سایت شما نیاز به ثبت نام دارید.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className='w-full justify-center gap-2'>
                        ورود با گیت هاب
                        <GitHubLogoIcon className='h-5 w-5' />
                    </Button>
                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <div className="mx-4 mb-0 text-center font-semibold dark:text-white">
                            یا
                        </div>
                    </div>
                    <SigninForm />
                </CardContent>
            </Card>
        }
    </main>
        ;

}
export default SignIn
