export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with gradient and animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-white/95">
        <div className="absolute inset-0 bg-[#16465B]/5"></div>

        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#16465B]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#16465B]/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#16465B]/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-[#16465B] mb-6 leading-tight">
            Discover Your Path
            <span className="block bg-gradient-to-r from-[#16465B] to-[#16465B]/70 bg-clip-text text-transparent">
              Define Your Future
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-[#16465B]/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            EduPath AI helps JHS students uncover their strengths, understand
            their interests, and find the right career path powered by data,
            grades, and smart guidance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group relative px-8 py-4 bg-[#16465B] hover:bg-[#16465B]/90 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
              <a href="/login?redirect=assessment">
                <span className="relative z-10">Take Assessment Test</span>
              </a>
            </button>

            <button className="px-8 py-4 text-[#16465B]/90 hover:text-[#16465B] font-semibold text-lg transition-colors duration-300 hover:scale-105">
              <a href="/chat">
                Chat with AI
                <span className="ml-2">→</span>
              </a>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#16465B]/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#16465B]/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
