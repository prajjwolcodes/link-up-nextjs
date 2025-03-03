"use client"

import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UserProps } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { editUserSchema } from '@/schema/editUserSchema';
import { z } from "zod"
import axios from 'axios';
import toast from "react-hot-toast";
import { useEditProfileMutation } from '@/hooks/useEditProfileMutation';




const UserDetailsForm = ({ user }: { user: UserProps }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const mutation = useEditProfileMutation();

    // React Hook Form setup
    const form = useForm({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            displayName: user.displayName,
            bio: user.bio || ""
        }
    });

    // Reset form when dialog opens
    const handleDialogChange = (open: boolean) => {
        if (open) {
            form.reset({
                displayName: user.displayName,
                bio: user.bio || ""
            });
        }
        setOpen(open);
    };

    const onSubmit = async (data: z.infer<typeof editUserSchema>) => {
        setIsLoading(true)
        try {
            mutation.mutate(data)

        } catch (error) {
            // Handle error response (status code 400 or 500)
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                console.log("Error during signup:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false)
            setOpen(false);

        }

    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Dialog open={open} onOpenChange={handleDialogChange}>
                        <DialogTrigger asChild>
                            <Button className="px-6 bg-blue-600 hover:bg-blue-700">
                                <Pencil size={14} />
                                <span>Edit</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile information here.
                                </DialogDescription>
                            </DialogHeader>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                                    <FormField
                                        control={form.control}
                                        name="displayName"
                                        rules={{ required: "Display name is required" }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Display Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bio</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        className="min-h-24"
                                                        placeholder="Tell us about yourself"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <DialogFooter className="mt-6">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button disabled={isLoading} type="submit">{isLoading ? "Saving..." : "Save changes"}</Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>


            </div>
        </div>
    );
};

export default UserDetailsForm;