import { EmptyMemories } from '@/components/EmptyMemories'
import { Hero } from '@/components/Hero'
import { SignIn } from '@/components/SignIn'
import { GithubIcon } from 'lucide-react'

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2 bg-gray-900">
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

        <SignIn />
        <Hero />

        <div className="flex gap-1 text-gray-200 hover:text-gray-50">
          by
          <a
            href="https://github.com/Ronalt4cs"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Ronalt
          </a>
          <GithubIcon />
        </div>
      </div>

      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <EmptyMemories />
      </div>
    </main>
  )
}
