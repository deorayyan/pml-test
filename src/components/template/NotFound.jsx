import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export const NotFound = () => {
  return (
    <div className="flex p-5 mt-14 md:p-0 items-center justify-center">
      <div className="text-center">
        <h2 className="font-semibold">Page Not Found ⚠️</h2>
        <p>The requested URL /error was not found on this server.</p>

        <div className="mt-8 mb-14">
          <Button asChild className="px-5">
            <Link href="/home">Back to home</Link>
          </Button>
        </div>

        <Image src="/404.svg" width={400} height={400} alt="404" />
      </div>
    </div>
  );
};

export default NotFound;
