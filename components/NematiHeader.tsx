export function NematiHeader() {
  const navigationLinks = [
    { label: "Download Now", href: "#download" },
    { label: "Pricing", href: "#pricing" },
    { label: "Form", href: "#form" },
    { label: "Contact", href: "#contact" },
    { label: "FAQS", href: "#faqs" },
    { label: "Terms", href: "#terms" },
    { label: "Privacy & Policy", href: "#privacy" },
  ]

  return (
    <header className="bg-slate-900 text-white py-3 px-6 border-b border-slate-700">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
        {/* Left side - Brand and Navigation */}
        <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-xl font-semibold">Nemati AI</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-4 lg:gap-6">
            {navigationLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right side - Copyright and Version */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-xs text-gray-400">
          <span className="whitespace-nowrap">©2024 Nemati AI Inc. — Milwaukee, WI, USA</span>
          <span className="whitespace-nowrap">0.0.56 Updated on 2025-06-13</span>
        </div>
      </div>
    </header>
  )
}
