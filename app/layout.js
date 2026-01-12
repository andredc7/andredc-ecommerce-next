import '../styles/globals.css'
import Seed from '../components/Seed'

export const metadata = {
  title: 'Andre DC E-Commerce',
  description: 'Modern e-commerce built with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Seed />
        {children}
      </body>
    </html>
  )
}