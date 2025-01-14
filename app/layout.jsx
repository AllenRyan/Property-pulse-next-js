import '@/Assets/styles/globals.css'
import Footer from '@/components/footer';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'photoswipe/dist/photoswipe.css'
export const metadata = {
  title: "Property Pulse",
  keywords:"rental, property, realestate",
  description: "find the perfect rental property",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
    <html lang="en">
      <body>
      <main>
        <Navbar />
        {children}
        <Footer/>
          </main>
          <ToastContainer />
      </body>
    </html>
    </AuthProvider>

  );
}
