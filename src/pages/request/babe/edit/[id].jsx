import { useEffect, useState } from "react";
import RequestForm from "../RequestForm";
import { useDispatch } from "react-redux";
import { clearRequestDetail, getRequest } from "@/redux/slices/requestSlice";
import { useRouter } from "next/router";

export default function RequestEditPage() {
  const router = useRouter()
  const [initialValue, setInitialValue] = useState(null);
  const dispatch = useDispatch();

  const getDetail = async () => {
    if (router?.query?.id) {
      const { payload: data } = await dispatch(getRequest(router.query.id));
      console.log({
        ...data, 
        receivedDate: new Date(data?.analysisCompletedDate),
        analysisWipDate: new Date(data?.analysisWipDate),
        analysisCompletedDate: new Date(data?.analysisCompletedDate),
      })
      setInitialValue({
        ...data, 
        receivedDate: new Date(data?.analysisCompletedDate),
        analysisWipDate: new Date(data?.analysisWipDate),
        analysisCompletedDate: new Date(data?.analysisCompletedDate),
      });
    }
  }

  useEffect(() => {
    getDetail();

    return () => {
      dispatch(clearRequestDetail());
    }
  }, [dispatch, router]);

  if (!initialValue) return <>Loading...</>;

  return <RequestForm initialValue={initialValue} />;
}
