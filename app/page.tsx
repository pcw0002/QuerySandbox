export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="mb-0 text-center lg:text-left">First Name, Last Name</p>
      </div>

      <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
        <div className="">
          <h1 className="text-4xl font-bold mb-4">Hello, I&apos;m First Name</h1>
          <p className="mb-8">
            I&apos;m a job title based in location. I specialize in something and
            have worked with some brand names.
          </p>
          </div>
      </div>
    </main>
  )
}
