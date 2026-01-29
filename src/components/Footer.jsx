import React from 'react';
import { Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentIcon = ({ label, children }) => (
  <div className="h-6 px-2 bg-white rounded flex items-center justify-center text-leather-dark font-bold text-[10px] tracking-tighter" title={label}>
    {children || label}
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-leather-dark text-white/80 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 items-start">
          
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
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
              <li><Link to="/legal" className="hover:text-white transition-colors">特定商取引法に基づく表記</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Care Guide</a></li>
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
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-leather-dark transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="mailto:ryuyakinjo@gmail.com" 
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-leather-dark transition-all duration-300"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Payments */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50">Payment Methods</h4>
            <div className="flex flex-wrap gap-2">
              <PaymentIcon label="VISA">VISA</PaymentIcon>
              <PaymentIcon label="Mastercard">Master</PaymentIcon>
              <PaymentIcon label="JCB">JCB</PaymentIcon>
              <PaymentIcon label="Amex">AMEX</PaymentIcon>
              <PaymentIcon label="Apple Pay">Pay</PaymentIcon>
              <PaymentIcon label="Google Pay">GPay</PaymentIcon>
              <div className="h-6 px-2 bg-[#FF0033] text-white rounded flex items-center justify-center font-bold text-[10px] tracking-tighter opacity-50" title="Coming Soon">
                PayPay
              </div>
            </div>
            <p className="text-[10px] opacity-50">
              Secured by Stripe
            </p>
          </div>

        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs opacity-50">
          <p>© 2026 Oh!! Mine by Yazirusi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
