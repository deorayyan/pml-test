import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ChevronLeft, Save, SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Separator } from "@/components/ui/Separator";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import Combobox from "@/components/Combobox";
import { addRequest, updateRequest } from "@/redux/slices/requestSlice";
import { useToast } from "@/hooks/useToast";
import DatePicker from "@/components/Datepicker";
import { formatISO } from "date-fns";

const formSchema = z.object({
  partnerId: z.string().min(1, {message: "Please select Partner"}),
  projectCode: z.string().min(1, {message: "Project Code is required"}),
  totalFee: z.number(),
  lastStatus: z.string(),
  receivingStatus: z.string(),
  leadTime: z.number(),
  receivedDate: z.date(),
  analysisWipDate: z.date(),
  analysisCompletedDate: z.date(),
  dueDate: z.date(),
  requestDate: z.date(),
});

const RequestForm = ({
  initialValue,
  head,
  readOnly,
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partnerId: "",
      projectCode: "",
      totalFee: "",
      lastStatus: "",
      receivingStatus: "",
      leadTime: "",
      receivedDate: "",
      analysisWipDate: "",
      analysisCompletedDate: "",
      dueDate: "",
      requestDate: "",
      ...initialValue
    },
    mode: "onSubmit"
  });

  const { loading, submitting } = useSelector((state) => state.request);

  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values) => {
    try {
      if (initialValue?.id) {
        await dispatch(updateRequest({
          id: initialValue?.id,
          ...values,
          receivedDate: formatISO(values.analysisCompletedDate),
          analysisWipDate: formatISO(values.analysisWipDate),
          analysisCompletedDate: formatISO(values.analysisCompletedDate),
          dueDate: formatISO(values.dueDate),
          requestDate: formatISO(values.requestDate),
        }));
        toast({
          title: "Saved",
          description: "Data has been updated."
        })
      } else {
        await dispatch(addRequest({
          ...values,
          receivedDate: formatISO(values.analysisCompletedDate),
          analysisWipDate: formatISO(values.analysisWipDate),
          analysisCompletedDate: formatISO(values.analysisCompletedDate),
          dueDate: formatISO(values.dueDate),
          requestDate: formatISO(values.requestDate),
        }));
        toast({
          title: "Submitted",
          description: "Data has been submitted."
        })
      }

      router.push("/request/ca");
    } catch (err) {
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
                onClick={() => router.push("/request/ca")}
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
                  name="partnerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partner</FormLabel>
                      <FormControl>
                        <Combobox
                          onValueChange={(val) => {
                            form.setValue("partnerId", val)
                          }}
                          defaultValue={field.value}
                          options={[
                            {
                              label: "Partner A",
                              value: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                          ]}
                          disabled={loading || readOnly}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Project Code"
                          disabled={loading || readOnly}
                          bounceTime={0}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="receivingStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiving Status</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Receiving Status"
                          disabled={loading || readOnly}
                          bounceTime={0}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Status</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last Status"
                          disabled={loading || readOnly}
                          bounceTime={0}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="requestDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Request Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          onDateChange={(val) => {
                            form.setValue("requestDate", val);
                          }}
                          value={field.value}
                          placeholder="Select Date"
                          disabled={loading || readOnly}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="analysisWipDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Analysis Wip Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onDateChange={(val) => {
                            form.setValue("analysisWipDate", val);
                          }}
                          placeholder="Select Date"
                          disabled={loading || readOnly}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="analysisCompletedDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Analysis Completed Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onDateChange={(val) => {
                            form.setValue("analysisCompletedDate", val);
                          }}
                          placeholder="Select Date"
                          disabled={loading || readOnly}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onDateChange={(val) => {
                            form.setValue("dueDate", val);
                          }}
                          placeholder="Select Date"
                          disabled={loading || readOnly}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="receivedDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Received Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onDateChange={(val) => {
                            form.setValue("receivedDate", val);
                          }}
                          placeholder="Select Date"
                          disabled={loading || readOnly}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="leadTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lead Time</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Lead Time"
                          disabled={loading || readOnly}
                          bounceTime={0}
                          {...field}
                          onChange={(e) => {
                            form.setValue("leadTime", e.target.rawValue)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="totalFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Fee</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Total Fee"
                          disabled={loading || readOnly}
                          bounceTime={0}
                          {...field}
                          onChange={(e) => {
                            form.setValue("totalFee", e.target.rawValue)
                          }}
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

export default RequestForm;
