import { Link } from "react-router-dom";
import { Leaf, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-base">Dr. Amit Kumar Pal</span>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              {t.footer.description}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/80">{t.footer.quickLinks}</h4>
            <div className="flex flex-col gap-2.5 text-sm text-background/60">
              <Link to="/about" className="hover:text-background transition-colors">{t.nav.about}</Link>
              <Link to="/services" className="hover:text-background transition-colors">{t.nav.services}</Link>
              <Link to="/shop" className="hover:text-background transition-colors">{t.nav.shop}</Link>
              <Link to="/blog" className="hover:text-background transition-colors">{t.nav.blog}</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/80">{t.nav.patientPortal}</h4>
            <div className="flex flex-col gap-2.5 text-sm text-background/60">
              <Link to="/book-appointment" className="hover:text-background transition-colors">{t.nav.bookAppointment}</Link>
              <Link to="/login" className="hover:text-background transition-colors">{t.nav.patientPortal}</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-background/80">{t.footer.contactUs}</h4>
            <div className="flex flex-col gap-3 text-sm text-background/60">
              <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> {t.doctor.chamber1}</div>
              <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" /> {t.doctor.chamber2}</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {t.doctor.consultationType}</div>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 mt-10 pt-6 text-center text-xs text-background/40">
          © {new Date().getFullYear()} Dr. Amit Kumar Pal. {t.footer.allRightsReserved}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
