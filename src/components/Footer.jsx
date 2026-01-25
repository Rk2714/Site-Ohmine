import React from 'react';
import { Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-leather-dark text-white/80 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white tracking-widest">Oh!! Mine</h3>
            <p className="text-sm font-light leading-relaxed opacity-70">
              Okinawa Traditional × Denim<br/>
              Handmade in Japan
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Care Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50">Connect</h4>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-leather-dark transition-all"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="mailto:info@ohmine.jp" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-leather-dark transition-all"
              >
                <Mail size={20} />
              </a>
            </div>
            <p className="text-xs opacity-50 mt-4">
              © 2026 Oh!! Mine by Yazirusi.<br/>
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
