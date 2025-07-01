export function NematiFooter() {
  const navigationLinks = [
    { label: "Download Now", href: "https://nemati.ai/en/download" },
    { label: "Pricing", href: "https://nemati.ai/en/pricing" },
    { label: "Form", href: "https://nemati.ai/en/forms" },
    { label: "Contact", href: "https://nemati.ai/en/contact" },
    { label: "FAQs", href: "https://nemati.ai/en/faqs" },
    { label: "Terms", href: "https://nemati.ai/en/terms" },
    { label: "Privacy & Policy", href: "https://nemati.ai/en/privacy" },
  ];

  return (
    <footer className="bg-slate-900 text-white py-4 px-6 w-full">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
        {/* Left side - Brand and Navigation */}
        <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
          {/* Brand with Real Logo (wrapped in link) */}
          <a
            href="https://nemati.ai/en"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline"
          >
            <img
              src="https://nemati.ai/images/common/logo.svg"
              alt="Nemati AI Logo"
              className="w-6 h-6"
              onError={(e) => {
                // Fallback if logo fails to load
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-purple-600 rounded flex items-center justify-center hidden">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-lg font-semibold">Nemati AI</span>
          </a>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-4 lg:gap-6">
            {navigationLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap hover:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right side - Copyright and Version */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-400">
          <span className="whitespace-nowrap">©2023 - 2025 Nemati AI Inc. — Milwaukee, WI, USA</span>
          <span className="whitespace-nowrap">0.0.4 Updated on 2025-06-30</span>
        </div>
      </div>
    </footer>
  );
}
