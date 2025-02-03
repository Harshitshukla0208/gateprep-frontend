import { Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-gray-300" />
              <a 
                href="mailto:singhshivansh12may@gmail.com" 
                className="text-sm sm:text-base text-gray-300 hover:text-indigo-300 transition-colors"
              >
                mrharshitshukla2672@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-gray-300" />
              <a 
                href="tel:+919044029414" 
                className="text-sm sm:text-base text-gray-300 hover:text-indigo-300 transition-colors"
              >
                +91 9044029414
              </a>
            </div>
          </div>

          {/* Social and Copyright */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <p className="text-xs sm:text-sm text-gray-400 text-center">
              &copy; {new Date().getFullYear()} GATEPrep. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}