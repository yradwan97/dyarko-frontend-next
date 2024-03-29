import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({ Component, pageProps }) {
 return (
    // <html lang="en">
    //   <body>{children}</body>
    // </html>
    <Component {...pageProps}/>
  )
}
