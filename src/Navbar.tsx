import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    { name: t("navbar.homepage"), path: "/" },
    { name: t("navbar.room"), path: "/rooms" },
    { name: t("navbar.rank"), path: "/ranking" },
    { name: t("navbar.experience_packages"), path: "/plans" },
  ];

  return (
    <nav className="w-full bg-[#0C1A57] text-white px-6 py-4 mt-[80px]">
      <ul className="flex justify-between items-center w-full max-w-4xl mx-auto">
        {navItems.map((item) => (
          <li key={item.name} className="relative">
            <NavLink to={item.path} className="no-underline">
              {({ isActive }: { isActive: boolean }) => (
                <div className="relative inline-block group">
                  <span
                    className={`px-2 py-1 transition-colors duration-300 ${
                      isActive
                        ? "text-[#FACC15] font-semibold"
                        : "text-white group-hover:text-[#FACC15]"
                    }`}
                  >
                    {item.name}
                  </span>

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-[#FACC15] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
