import '@/Assets/styles/globals.css'



export const metadata = {
  title: "Property Pulse",
  keywords:"rental, property, realestate",
  description: "find the perfect rental property",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <main>
        {children}
      </main>
      </body>
    </html>
  );
}