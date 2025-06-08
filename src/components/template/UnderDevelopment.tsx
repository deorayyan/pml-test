import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export const UnderDevelopment = () => {
  return (
    <div className="flex md:p-4 items-center justify-center">
      <div className="text-center">
        <h2 className="font-semibold">Hold Tight! We're Almost Ready! 🚀</h2>
        <p>
          We're working behind the scenes to bring you something amazing. Stay
          tuned—great things are coming soon!
        </p>

        <div className="mt-8 mb-12">
          <Button asChild className="px-5">
            <Link href="/home">Back to home</Link>
          </Button>
        </div>

        <Image
          src="/under-maintenance.svg"
          width={600}
          height={600}
          alt="Under Development"
        />
      </div>
    </div>
  );
};

export default UnderDevelopment;
