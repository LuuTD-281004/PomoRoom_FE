import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement | null>(null);
  const { t } = useTranslation();

  const navItems = [
    { name: t("navbar.homepage"), path: "/" },
    { name: t("navbar.room"), path: "/rooms" },
    { name: t("navbar.rank"), path: "/ranking", hasDropdown: true },
    { name: t("navbar.experience_packages"), path: "/plans" },
  ];

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!dropdownRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!dropdownRef.current.contains(e.target) && dropdownOpen) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [dropdownOpen]);

  return (
    <nav className="w-full bg-[#0C1A57] text-white px-6 py-4 mt-[100px]">
      <ul className="flex justify-between items-center w-full max-w-4xl mx-auto">
        {navItems.map((item) => (
          <li
            key={item.name}
            className="relative"
            ref={item.hasDropdown ? dropdownRef : null} 
          >
            <div className="flex items-center">
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

              {item.hasDropdown && (
                <span
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="ml-2 cursor-pointer select-none"
                >
                  {dropdownOpen ? (
                    <ChevronUp size={16} className="text-white" />
                  ) : (
                    <ChevronDown size={16} className="text-white" />
                  )}
                </span>
              )}
            </div>

            {item.hasDropdown && dropdownOpen && (
              <ul className="absolute top-full left-0 mt-1 bg-white text-black rounded-lg shadow-md min-w-[180px] overflow-hidden">
                <li>
                  <NavLink
                    to="/ranking/personal"
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm transition-colors ${
                        isActive
                          ? "font-semibold text-[#0C1A57] bg-gray-100"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    onClick={() => setDropdownOpen(false)}
                  >
                    {t("navbar.personal_achievements")}
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
