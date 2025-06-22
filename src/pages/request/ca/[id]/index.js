import { useEffect, useState } from "react";
import RequestForm from "../RequestForm";
import { useDispatch } from "react-redux";
import { clearRequestDetail, getRequest } from "@/redux/slices/requestSlice";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

export default function RequestEditPage() {
  const router = useRouter();
  const [initialValue, setInitialValue] = useState(null);
  const dispatch = useDispatch();

  const getDetail = async () => {
    if (router?.query?.id) {
      const { payload: data } = await dispatch(getRequest(router.query.id));
      setInitialValue({
        ...data,
        receivedDate: new Date(data?.analysisCompletedDate),
        analysisWipDate: new Date(data?.analysisWipDate),
        analysisCompletedDate: new Date(data?.analysisCompletedDate),
        dueDate: new Date(data?.dueDate),
        requestDate: new Date(data?.requestDate),
      });
    }
  };

  useEffect(() => {
    getDetail();

    return () => {
      dispatch(clearRequestDetail());
    };
  }, [dispatch, router]);

  if (!initialValue) return <Loader />;

  return <RequestForm readOnly initialValue={initialValue} />;
}
