import { useEffect, useState } from "react";
import MasterTrackerForm from "../MasterTrackerForm";
import { useDispatch } from "react-redux";
import { clearMasterTrackerDetail, getMasterTracker } from "@/redux/slices/masterTrackerSlice";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

export default function MasterTrackerEditPage() {
  const router = useRouter()
  const [initialValue, setInitialValue] = useState(null);
  const dispatch = useDispatch();

  const getDetail = async () => {
    if (router?.query?.id) {
      const { payload: data } = await dispatch(getMasterTracker(router.query.id));
      setInitialValue({
        ...data, 
      });
    }
  }

  useEffect(() => {
    getDetail();

    return () => {
      dispatch(clearMasterTrackerDetail());
    }
  }, [dispatch, router]);

  if (!initialValue) return <Loader />;

  return <MasterTrackerForm initialValue={initialValue} />;
}
