import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Provider from "@/components/providers/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
        <Provider>
  <Navbar />

  <main>{children}</main>

  <footer className="mt-16 border-t border-slate-200 bg-white py-6 text-center dark:border-slate-700 dark:bg-slate-900">
    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
      College Discovery Platform
    </h2>

    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
      Built with ❤️ by Ayushi Srivastava
    </p>

    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
      © 2026 College Discovery Platform. All rights reserved.
    </p>
     </footer>
      </Provider>
      </body>
    </html>
  );
}