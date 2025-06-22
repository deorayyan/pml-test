export default function Loader({
  fullHeight,
  loadingText = "Loading...",
}) {
  return (
    <div
      className={`flex h-[calc(100vh_-_126px)] w-full items-center justify-center ${
        fullHeight ? "h-screen" : "h-[calc(100vh_-_200px)]"
      }`}
    >
      <div className="loader"></div>
      <p className="py-10 ml-12 text-xl text-muted-foreground">{loadingText}</p>
    </div>
  );
}
