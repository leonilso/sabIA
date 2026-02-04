import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-sidebar">
      <AppHeader />
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 pt-6 pb-6 px-6 bg-background rounded-tl-3xl">
          <div className="bg-card rounded-3xl p-6 max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] shadow-card">
            {(title || subtitle) && (
              <div>
                {title && (
                  <h1 className="font-display text-2xl font-bold text-foreground">{title}</h1>
                )}
                {subtitle && (
                  <p className="text-muted-foreground mt-1">{subtitle}</p>
                )}
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
