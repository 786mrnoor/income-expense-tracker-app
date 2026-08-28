import React from "react";

import { Spinner } from "../icons/Spinner.tsx";

type QueryLoaderProps = {
  children?: React.ReactNode;
};

function QueryLoader({ children }: QueryLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 text-center text-gray-900">
      <Spinner className="animate-spin" /> {children || "Loading..."}
    </div>
  );
}

export { QueryLoader };
