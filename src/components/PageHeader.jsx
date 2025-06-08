import { Card, CardContent, CardFooter } from "./ui/Card";

export const BasePageHeader = ({ pageTitle }) => {
  return (
    <div className="grid grid-cols-1 gap-1 pt-2 pb-1">
      <h2>{pageTitle}</h2>
    </div>
  );
};

export const PageHeader = ({
  pageTitle,
  tools,
}) => {
  return (
    <Card className="sticky top-[70px] z-30">
      <CardContent className="border-b border-border md:py-2 md:px-5">
        <BasePageHeader pageTitle={pageTitle} />
      </CardContent>
      {tools && (
        <CardFooter className="w-full py-3 px-4">
          <div className="flex gap-2 items-center w-full">{tools}</div>
        </CardFooter>
      )}
    </Card>
  );
};

export default PageHeader;
