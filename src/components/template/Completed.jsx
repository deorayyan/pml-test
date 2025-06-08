import Image from "next/image";

export const Completed = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-10 items-center justify-center w-full md:px-4">
        <div className="shrink-0">
          <h2 className="font-bold text-primary text-4xl mb-2">GOOD JOB!</h2>
          <p className="text-xl text-soft">
            You have completed
            <br />
            all your task.
          </p>
        </div>

        <div>
          <Image src="/completed.svg" width={640} height={640} alt="No Data" />
        </div>
      </div>
    </div>
  );
};

export default Completed;
