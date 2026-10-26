import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({
  children,
  className,
  hoverable = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "border-surface-border bg-surface overflow-hidden rounded-lg border shadow-sm dark:shadow-black/30",
        hoverable &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "border-b border-gray-200 p-4 md:p-6 dark:border-gray-800",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  return (
    <div className={cn("p-4 md:p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "border-t border-gray-200 bg-gray-50 p-4 md:p-6 dark:border-gray-800 dark:bg-gray-950",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
