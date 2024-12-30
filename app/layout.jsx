import '@/Assets/styles/globals.css'
import Footer from '@/components/footer';
import Navbar from '@/components/Navbar';



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
        <Navbar />
        {children}
        <Footer/>
      </main>
      </body>
    </html>
  );
}
