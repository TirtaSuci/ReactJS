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
        <Navbar></Navbar>
        <main>{children}</main>
      </body>
    </html>
  )
}