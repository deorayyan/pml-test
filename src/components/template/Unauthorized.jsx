import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export const Unauthorized = () => {
  return (
    <div className="flex p-5 mt-4 items-center justify-center">
      <div className="text-center">
        <h2 className="font-semibold">Unauthorized! ⚠️</h2>
        <p>
          Sorry, looks like you don't have permission to visit this page.
          <br />
          If it's a mistake, please contact Administrator.
        </p>

        <div className="mt-8 mb-12">
          <Button asChild className="px-5">
            <Link href="/home">Back to home</Link>
          </Button>
        </div>

        <Image
          src="/unauthorized.svg"
          width={550}
          height={550}
          alt="Unauthorized"
        />
      </div>
    </div>
  );
};

export default Unauthorized;
