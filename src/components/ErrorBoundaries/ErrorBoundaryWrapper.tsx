import * as Sentry from "@sentry/react";
import { ErrorBoundaryProps } from "@sentry/react/dist/errorboundary";

interface Props {
    children: JSX.Element;
}

export const ErrorBoundaryWrapper = ({
    children,
    ...args
}: Props & ErrorBoundaryProps) => {
    return <Sentry.ErrorBoundary {...args}>{children}</Sentry.ErrorBoundary>;
};
