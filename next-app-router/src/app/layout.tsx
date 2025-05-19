import './globals.css'
import Navbar from './navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar>Home</Navbar>
        {children}
      </body>
    </html>
  )
}