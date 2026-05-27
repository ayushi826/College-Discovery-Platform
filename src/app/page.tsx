import Link from "next/link";

export default function HomePage() {
  return (
    <main className="overflow-hidden dark:bg-slate-900">
      <section className="relative">
        <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:-translate-y-1 hover:bg-blue-200">
              🎓 India’s Smart College Finder
            </div>

            <h1 className="text-6xl font-black leading-tight text-gray-900 md:text-7xl dark:text-white">
              Find the
              <span className="gradient-text">
                {" "}perfect college
              </span>
              {" "}for your future.
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-gray-600">
              Compare placements, rankings, fees,
              campus life, and student reviews —
              all in one beautiful platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href="/colleges"
                className="rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-200 hover:-translate-y-1 hover:bg-blue-700"
              >
                Explore Colleges
              </Link>

              <Link
                href="/compare"
                className="glass rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-200 hover:-translate-y-1 hover:bg-blue-700"
              >
                Compare Colleges
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-6">
              <div className="glass rounded-3xl p-6">
                <h2 className="text-5xl font-black text-blue-600">
                  500+
                </h2>

                <p className="mt-2 text-gray-600">
                  Verified Colleges
                </p>
              </div>

              <div className="glass rounded-3xl p-6">
                <h2 className="text-5xl font-black text-green-600">
                  95%
                </h2>

                <p className="mt-2 text-gray-600">
                  Placement Success
                </p>
              </div>

              <div className="glass rounded-3xl p-6">
                <h2 className="text-5xl font-black text-purple-600">
                  50K+
                </h2>

                <p className="mt-2 text-gray-600">
                  Reviews
                </p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:flex items-start justify-center -mt-70">

  <img
  src="https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg"
  alt="College"
  className="w-[500px] h-[500px] object-cover rounded-[40px] shadow-2xl"
  />
   <div className="absolute -bottom-15 left-1/2 -translate-x-1/2 flex w-full max-w-[520px] justify-between px-2" >
  
  <div className="bg-green-400 text-white px-8 py-4 rounded-2xl shadow-xl shadow-black-200 dark:bg-color-white-800 hover:-translate-y-1 hover:bg-pink-500">
    ⭐ 4.9 Student Rating
  </div>

  <div className="bg-green-400 text-white px-8 py-4 rounded-2xl shadow-xl shadow-black-200 dark:bg-color-white-800 hover:-translate-y-1 hover:bg-pink-500 ">
    🎯 95% Placement Rate
  </div>

</div>
</div>
        </div>
      </section>
    </main>

    
  );
}