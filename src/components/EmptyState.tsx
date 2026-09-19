import type React from "react";

export interface EmptyStateProps {
  message?: string;
}

export function EmptyState(props?: EmptyStateProps): React.JSX.Element {
  return (
    <p className="empty-state">
      {props?.message ?? "No products match the current filter."}
    </p>
  );
}

export default EmptyState;
