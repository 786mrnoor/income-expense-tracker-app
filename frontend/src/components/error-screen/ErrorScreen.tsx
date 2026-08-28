import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Anchor } from "../icons/Anchor";
import { ErrorBoundary } from "react-error-boundary";
import type React from "react";

type ErrorScreenProps = {
  children: React.ReactNode;
  title?: string;
};

function ErrorScreen({
  children,
  title = "There was an error!",
}: ErrorScreenProps) {
  const { reset } = useQueryErrorResetBoundary();

  function getErrorMessage(error: unknown) {
    let message = "Something went wrong";
    if (error instanceof Error) message = error.message;

    return message;
  }

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary, error }) => (
        <div className="broder-2 m-auto w-full max-w-md rounded-2xl border-gray-400 bg-white p-8 text-center shadow-2xl shadow-gray-400">
          {/* Visual Anchor / Icon */}
          <div className="bg-red-100 text-red-500 mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full">
            <Anchor className="size-8 text-red" />
          </div>

          <h1 className="mb-3 text-2xl font-bold tracking-tight text-red">
            {title}
          </h1>
          <p className="mb-8 text-sm leading-relaxed text-gray-500">
            {getErrorMessage(error)}
          </p>

          <button
            className="btn btn-danger"
            onClick={() => resetErrorBoundary()}
          >
            Try Again
          </button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}

export { ErrorScreen };
