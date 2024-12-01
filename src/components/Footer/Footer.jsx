import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "For designers",
    links: [
      { text: "Go Pro!", href: "/pro" },
      { text: "Explore design work", href: "/shots" },
      { text: "Design blog", href: "/blog" },
      { text: "Overtime podcast", href: "/overtime" },
      { text: "Playoffs", href: "/playoffs" },
      { text: "Code of conduct", href: "/conduct" }
    ]
  },
  {
    title: "Hire designers",
    links: [
      { text: "Post a job opening", href: "/jobs/new" },
      { text: "Post a freelance project", href: "/freelance-jobs/new" },
      { text: "Search for designers", href: "/designers" }
    ]
  },
  {
    title: "Brands",
    links: [
      { text: "Advertise with us", href: "/advertise" }
    ]
  },
  {
    title: "Company",
    links: [
      { text: "About", href: "/about" },
      { text: "Careers", href: "/careers" },
      { text: "Support", href: "/support" },
      { text: "Media kit", href: "/media-kit" },
      { text: "Testimonials", href: "/testimonials" },
      { text: "API", href: "/api" },
      { text: "Terms of service", href: "/terms" },
      { text: "Privacy policy", href: "/privacy" },
      { text: "Cookie policy", href: "/cookies" }
    ]
  },
  {
    title: "Directories",
    links: [
      { text: "Design jobs", href: "/jobs" },
      { text: "Designers for hire", href: "/designers/for-hire" },
      { text: "Freelance designers for hire", href: "/freelancers" },
      { text: "Tags", href: "/tags" },
      { text: "Places", href: "/places" }
    ]
  },
  {
    title: "Design assets",
    links: [
      { text: "Creative Market", href: "https://creativemarket.com" },
      { text: "Fontspring", href: "https://www.fontspring.com" },
      { text: "Font Squirrel", href: "https://www.fontsquirrel.com" }
    ]
  }
];

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300">
      <div className="max-w-[1320px] mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-gray-800 font-medium text-sm mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-gray-800 text-sm"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://cdn.dribbble.com/assets/logo-bw-0200c7483844c355752e89519359c4e4af960601071c90cf81d66ce8a786d6b8.svg" 
                alt="Dribbble" 
                className="w-20 h-8"
              />
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-gray-600 text-sm">
              © 2024 RIBBBLE
            </span>
            <span className="text-gray-600 text-sm">
              <strong className="text-gray-800">20,123,189</strong> shots RIBBBLED
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
