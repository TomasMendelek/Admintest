"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(1, "Role name is required"),
});

type RoleFormValues = z.infer<typeof formSchema>;

const RoleForm = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<RoleFormValues> = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/roles/${params.roleId}`, data);
        toast.success("Role updated successfully");
      } else {
        await axios.post(`/api/${params.storeId}/roles`, data);
        toast.success("Role created successfully");
      }
      router.push(`/${params.storeId}/roles`);
    } catch (error) {
      toast.error("Error saving role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title={initialData ? "Edit Role" : "New Role"} description={initialData ? "Edit role details" : "Create a new role"} />
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Role Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit" className="ml-auto">
              {initialData ? "Update" : "Create"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RoleForm;
