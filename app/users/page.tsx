'use client';
import React, { useState } from "react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useFetchUsers, useUpdateUser } from "./users.hook";
import { Button } from "@/components/ui/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/ui/form"
import { Input } from "@/components/ui/ui/input"
import { Label } from "@/components/ui/ui/label"

const formSchema = z.object({
  firstName: z.string().min(2).max(15),
  lastName: z.string().min(2).max(15),
  age: z.string().min(1).max(2),
  id: z.string()
})

export default function Users() {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({});

  const { data, isLoading } = useFetchUsers();
  const { mutate } = useUpdateUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      age: user.age || "",
      id: user.id || "",
    },
  })


  const handleEditCLick = (user) => {
    console.log(user)
    setUser(user);
    setEdit((prev) => !prev);
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("values", values)
    console.log("user", user)
    mutate({data: {id: user?.id, firstName: values.firstName, lastName: values.lastName, age: values.age}});
    setEdit((prev) => !prev);
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <main className="flex flex-col items-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Users</h1>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.firstName }</td>
                <td className="border px-4 py-2">{user.lastName }</td>
                <td className="border px-4 py-2">{user.age}</td>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">
                  <Button onClick={() => handleEditCLick(user)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {edit && (
          <div className=" border border-black bg-opacity-50 px-8 py-4 mt-4 flex items-center justify-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit((values) => onSubmit(values))} className="space-y-8">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        )}
      </main>
    </div>
  )
}