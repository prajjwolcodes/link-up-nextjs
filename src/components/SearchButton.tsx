"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

const searchSchema = z.object({
    input: z.string().min(1)
})

const SearchButton = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            input: ""
        }
    })

    async function onSubmit(data: z.infer<typeof searchSchema>) {
        console.log(data);
        router.push(`/search?q=${encodeURIComponent(data.input.trim())}`)

    }
    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-2xl px-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="input"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                placeholder="Search..."
                                                className="w-full h-12 pr-12"
                                                {...field}
                                            />
                                            <Button
                                                type="submit"
                                                size="icon"
                                                className="h-8 w-8 absolute right-2 border-none border-transparent top-2 bg-transparent hover:bg-gray-100"
                                            >
                                                <Search className="h-4 w-4 text-gray-500" />
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default SearchButton