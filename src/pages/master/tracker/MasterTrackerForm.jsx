import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ChevronLeft, Save, SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { useDialog } from "@/app/context/DialogContext";
import { Separator } from "@/components/ui/Separator";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";
import Combobox from "@/components/Combobox";
import { Textarea } from "@/components/ui/Textarea";
import { addTracker, fetchAllTrackers, updateTracker } from "@/redux/slices/masterTrackerSlice";
import { useToast } from "@/hooks/useToast";

const formSchema = z.object({
  actionType: z.string().min(1, {message: "Please select Action Type"}),
  code: z.string().min(1, {message: "Code is required"}),
  description: z.string().min(1, {message: "Description is required"}),
  isParallel: z.boolean(),
  isPublic: z.boolean(),
  isUsingNotification: z.boolean(),
  mandays: z.number({ invalid_type_error: "Mandays is required" }),
  moduleFlow: z.string().min(1, {message: "Please select Module Flow"}),
  order: z.number().min(0, {message: "Order is required"}),
  parentCode: z.string(),
});

const MasterTrackerForm = ({
  initialValue,
  head,
  readOnly,
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValue,
    mode: "onSubmit"
  });

  const { loading, submitting, list } = useSelector((state) => state.tracker);

  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchAllTrackers());
  }, []);

  const onSubmit = async (values) => {
    try {
      if (initialValue.id) {
        await dispatch(updateTracker({
          id: initialValue.id,
          ...values
        }));
        toast({
          title: "Saved",
          description: "Data has been updated."
        })
      } else {
        await dispatch(addTracker(values));
        toast({
          title: "Submitted",
          description: "Data has been submitted."
        })
      }

      router.push("/master/tracker");
    } catch (err) {
      console.log("err", err);
      toast({
        variant: "danger",
        title: "Error",
        description: "Something went wrong."
      })
    }
  };

  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mb-4 sticky top-[70px] z-10">
          {head && (
            <CardContent className="border-b md:py-2 md:px-5">
              {head}
            </CardContent>
          )}
          <CardFooter className="w-full py-3 px-4">
            <div className="flex gap-2 items-center w-full">
              <Button
                variant="outline"
                className="pr-5 pl-3"
                onClick={() => router.push("/master/tracker")}
                type="button"
              >
                <ChevronLeft />
                Back
              </Button>

              {!readOnly && (
                <>
                  <Separator orientation="vertical" className="h-10" />

                  <Button
                    type="submit"
                    loading={submitting}
                    loadingText="Submitting"
                    onClick={() => {
                      console.log("form", form);
                    }}
                  >
                    {!initialValue?.id ? <SendHorizontal /> : <Save />}
                    {!initialValue?.id ? "Submit" : "Save"}
                  </Button>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 gap-5 content-start md:px-20">
              <div className="grid grid-cols-2 gap-3 items-center content-center">
                <FormField
                  control={form.control}
                  name="actionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Action Type</FormLabel>
                      <FormControl>
                        <Combobox
                          onValueChange={(val) => {
                            form.setValue("actionType", val)
                          }}
                          defaultValue={field.value}
                          options={[
                            {
                              label: "None",
                              value: "none"
                            },
                            {
                              label: "Text",
                              value: "text"
                            },
                            {
                              label: "File",
                              value: "file"
                            },
                            {
                              label: "Date",
                              value: "date"
                            }
                          ]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Code"
                          disabled={loading}
                          bounceTime={0}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        disabled={loading}
                        bounceTime={0}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-6">
                <FormField
                  control={form.control}
                  name="isParallel"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isParallel"
                        checked={field.value ?? false}
                        onCheckedChange={(checked) => {
                          form.setValue("isParallel", checked);
                        }}
                        disabled={loading}
                      />
                      <Label htmlFor="isParallel">Parallel</Label>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isPublic"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isPublic"
                        checked={field.value ?? false}
                        onCheckedChange={(checked) => {
                          form.setValue("isPublic", checked);
                        }}
                        disabled={loading}
                      />
                      <Label htmlFor="isPublic">Public</Label>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isUsingNotification"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isUsingNotification"
                        checked={field.value ?? false}
                        onCheckedChange={(checked) => {
                          form.setValue("isUsingNotification", checked);
                        }}
                        disabled={loading}
                      />
                      <Label htmlFor="isUsingNotification">Notification</Label>
                    </div>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="mandays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mandays</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Mandays"
                          disabled={loading}
                          bounceTime={0}
                          {...field}
                          onChange={(e) => {
                            form.setValue("mandays", e.target.rawValue)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="moduleFlow"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Module Flow</FormLabel>
                      <FormControl>
                        <Combobox
                          onValueChange={(val) => {
                            form.setValue("moduleFlow", val)
                          }}
                          defaultValue={field.value}
                          options={[
                            {
                              label: "CA",
                              value: "CA"
                            },
                          ]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:max-w-24">
                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Order"
                          disabled={loading}
                          bounceTime={0}
                          {...field}
                          onChange={(e) => {
                            form.setValue("order", e.target.rawValue)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="parentCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent</FormLabel>
                      <FormControl>
                        <Combobox
                          onValueChange={(val) => {
                            form.setValue("parentCode", val)
                          }}
                          defaultValue={field.value}
                          options={list.map((item) => ({
                            label: item.code,
                            value: item.code,
                          }))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default MasterTrackerForm;
