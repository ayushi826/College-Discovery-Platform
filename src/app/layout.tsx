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
          {children}
        </Provider>
      </body>
    </html>
  );
}