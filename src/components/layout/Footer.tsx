import { Link } from "react-router-dom";
import { Leaf, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
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
              {t.footer.description}
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">{t.footer.quickLinks}</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <Link to="/about" className="hover:text-primary-foreground transition-colors">{t.nav.about}</Link>
              <Link to="/services" className="hover:text-primary-foreground transition-colors">{t.nav.services}</Link>
              <Link to="/shop" className="hover:text-primary-foreground transition-colors">{t.nav.shop}</Link>
              <Link to="/blog" className="hover:text-primary-foreground transition-colors">{t.nav.blog}</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">{t.nav.patientPortal}</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <Link to="/book-appointment" className="hover:text-primary-foreground transition-colors">{t.nav.bookAppointment}</Link>
              <Link to="/login" className="hover:text-primary-foreground transition-colors">{t.nav.patientPortal}</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">{t.footer.contactUs}</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> {t.doctor.chamber1}</div>
              <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> {t.doctor.chamber2}</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {t.doctor.consultationType}</div>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} Dr. Amit Kumar Pal. {t.footer.allRightsReserved}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
