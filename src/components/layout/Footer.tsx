import { Link } from "react-router-dom";
import { Leaf, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
              <Leaf className="w-4 h-4" />
            </div>
            <span className="font-heading font-bold">Dr. Amit Kumar Pal</span>
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Trusted homeopathic care with a holistic approach to healing. Natural remedies for lasting wellness.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <Link to="/about" className="hover:text-primary-foreground transition-colors">About</Link>
            <Link to="/services" className="hover:text-primary-foreground transition-colors">Services</Link>
            <Link to="/shop" className="hover:text-primary-foreground transition-colors">Shop</Link>
            <Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Patient</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <Link to="/book-appointment" className="hover:text-primary-foreground transition-colors">Book Appointment</Link>
            <Link to="/login" className="hover:text-primary-foreground transition-colors">Patient Portal</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
            <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 98765 43210</div>
            <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> dr.amitpal@clinic.com</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> New Delhi, India</div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
        © {new Date().getFullYear()} Dr. Amit Kumar Pal. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
