import { useEffect, useState } from "react";
import MasterTrackerForm from "../MasterTrackerForm";
import { useDispatch } from "react-redux";
import { clearTrackerDetail, getTracker } from "@/redux/slices/masterTrackerSlice";
import { useRouter } from "next/router";

export default function MasterTrackerEditPage() {
  const router = useRouter()
  const [initialValue, setInitialValue] = useState(null);
  const dispatch = useDispatch();

  const getDetail = async () => {
    if (router?.query?.id) {
      const { payload: data } = await dispatch(getTracker(router.query.id));
      setInitialValue(data);
    }
  }

  useEffect(() => {
    getDetail();

    return () => {
      dispatch(clearTrackerDetail());
    }
  }, [dispatch, router]);

  if (!initialValue) return <>Loading...</>;

  return <MasterTrackerForm initialValue={initialValue} />;
}
