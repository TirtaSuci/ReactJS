import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Blog',
  description: '...',
  authors : [{ name: 'John Doe', url: 'https://example.com' }],
  icons: {
    icon: '/image/amongus.png',
  },
}

export default function Home() {
  return (
    <p>Hello World</p>
  )
}
