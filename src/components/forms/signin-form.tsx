'use client'
import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";


import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    email: z.string().email({
        message: "لطفا یک ایمیل معتبر وارد کنید.",
    }),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message: "پسورد باید حداقل ۶ کاراکتر شامل حروف بزرگ و کوچک انگلیسی، عدد و کاراکتر ویژه باشد.",
    }),
    confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
    message: "پسورد ها همخوانی ندارند.",
    path: ["confirm"], // path of error
});


export const SigninForm = ({ onCancel }: { onCancel: () => void }) => {
    const router = useRouter();

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
            const response = await axios.post('/api/stores', values);
            router.replace(`/${response.data.id}`);
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
                                placeholder="shopemail@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full gap-1">
                    <Button disabled={loading} variant="outline" onClick={onCancel}>
                        لغو
                    </Button>
                    <Button disabled={loading} type="submit">ادامه</Button>
                </div>
            </form>
        </Form>

    )
}
