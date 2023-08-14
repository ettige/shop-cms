'use client'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Control, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { EyeClosedIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    email: z.string().email({
        message: "لطفا یک ایمیل معتبر وارد کنید.",
    }),
    password: z.string().regex(/^(?=.*[\W_])(?=.*[A-Za-z])(?=.*\d).{6,}$/, {
        message: "پسورد باید حداقل ۶ کاراکتر شامل حروف بزرگ و کوچک انگلیسی، عدد و کاراکتر ویژه باشد.",
    }),
    confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
    message: "پسورد ها همخوانی ندارند.",
    path: ["confirm"], // path of error
});

const PasswordField = ({ control, name, label, loading }: { control: Control<any>, name: string, label: string, loading: boolean }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="flex items-center relative">
                            <Input
                                disabled={loading}
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder={label} {...field} />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute end-3">
                                {passwordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                            </button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export const SigninForm = ({ onCancel }: { onCancel?: () => void }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm: "",
        },
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const respone = await signIn("credentials", values);

        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ایمیل </FormLabel>
                            <FormControl>
                                <Input disabled={loading}
                                    placeholder="shop@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <PasswordField control={form.control} name="password" label="رمز عبور" loading={loading} />
                <PasswordField control={form.control} name="confirm" label="تکرار رمز عبور" loading={loading} />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full gap-1">
                    <Button disabled={loading} type="submit">ثبت نام</Button>
                </div>
            </form>
        </Form>

    )
}
