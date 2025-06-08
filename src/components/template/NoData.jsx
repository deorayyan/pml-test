import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export const NoData = ({ home }: { home?: boolean }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h2 className="font-semibold">No Results Found ⚠️</h2>
        <p>There is nothing to see yet.</p>

        {!home &&
          <div className="mt-8 mb-12">
            <Button asChild className="px-5">
              <Link href="/home">Back to home</Link>
            </Button>
          </div>
        }

        <Image src="/no-data.svg" width={460} height={460} alt="No Data" className="mt-5" />
      </div>
    </div>
  );
};

export default NoData;
