import React from "react";
import { useTranslation } from "react-i18next";
import { Paintbrush, UserPlus, Ban, BarChart3, Infinity, User, Users } from "lucide-react";
import Button from "@/Components/Button";
import Footer from "@/partials/Footer";

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Paintbrush className="w-10 h-10 text-black" />,
      text: t("services.feature1"),
    },
    {
      icon: <UserPlus className="w-10 h-10 text-black" />,
      text: t("services.feature2"),
    },
    {
      icon: <Ban className="w-10 h-10 text-black" />,
      text: t("services.feature3"),
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-black" />,
      text: t("services.feature4"),
    },
    {
      icon: <Infinity className="w-10 h-10 text-black" />,
      text: t("services.feature5"),
    },
  ];

  const faqs = [
    {
      question: t("faq.q1.title"),
      answer: t("faq.q1.answer"),
    },
    {
      question: t("faq.q2.title"),
      answer: t("faq.q2.answer"),
    },
    {
      question: t("faq.q3.title"),
      answer: t("faq.q3.answer"),
    },
    {
      question: t("faq.q4.title"),
      answer: t("faq.q4.answer"),
    },
  ];

  return (
    <div>
        <main>
            <section className="w-full min-w-screen flex flex-col items-center justify-center mt-10 mb-20">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0C1A57] text-center">
                    {t("services.title1")}
                    <br /> {t("services.title2")}
                </h2>
                <p className="text-[#0C1A57] mt-4 text-center max-w-2xl">
                    {t("services.subtitle")}
                </p>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 w-full max-w-7xl">
                    {features.map((f, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center space-y-4"
                    >
                        <div className="bg-[#B0FFF6] p-6 rounded-lg flex items-center justify-center">
                        {f.icon}
                        </div>
                        <p className="text-[#0C1A57] text-sm md:text-base font-medium">
                        {f.text}
                        </p>
                    </div>
                    ))}
                </div>
            </section>
            
            <section className="w-full min-w-screen flex flex-col items-center justify-center mt-10 mb-20 px-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0C1A57] text-center mb-12">
                {t("services.subtitle2")}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 max-w-6xl w-full">
                {[
                  {
                    key: "personal",
                    price: "39.500Đ/Tháng",
                    icon: <User className="w-6 h-6" />,
                  },
                  {
                    key: "group",
                    price: "349.000Đ/Tháng",
                    icon: <Users className="w-6 h-6" />,
                  },
                  {
                    key: "plus3",
                    price: "105.000Đ/Tháng",
                    icon: <UserPlus className="w-6 h-6" />,
                  },
                  {
                    key: "plus10",
                    price: "329.000Đ/Tháng",
                    icon: <UserPlus className="w-6 h-6" />,
                  },
                ].map((pkg) => (
                  <div
                    key={pkg.key}
                    className="flex flex-col justify-between items-center w-[280px] h-[350px] p-6 rounded-xl shadow-md bg-gradient-to-b from-[#457FF7] to-[#B3C5EA] text-white"
                  >
                    {/* Block title + line + price */}
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">{pkg.icon}</span>
                        <h3 className="text-lg md:text-xl font-semibold uppercase">
                          {t(`packages.${pkg.key}.title`)}
                        </h3>
                      </div>

                      <div className="w-2/3 h-[2px] bg-white" />

                      <p className="text-2xl md:text-3xl font-extrabold">{pkg.price}</p>
                    </div>

                    {/* Mô tả */}
                    <p className="text-sm md:text-base font-semibold italic text-center mt-4">
                      {t(`packages.${pkg.key}.desc`)}
                    </p>

                    {/* Nút mua */}
                    <a
                      href="/packages"
                      className="mt-6 px-6 py-2 bg-white text-[#0C1A57] font-semibold rounded-full text-center hover:bg-gray-100 transition"
                    >
                      {t("packages.buyButton")}
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex justify-center mt-6">
              <Button type="submit" size="wide">
                {t("homepage.join_room")}
              </Button>
            </div>
            
          <section className="w-full min-w-screen flex flex-col items-center justify-center mt-10 mb-10 px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0C1A57] text-center px-6 py-3 rounded-lg">
              {t("services.title3")}
            </h2>

            <div className="mt-5 w-full max-w-5xl bg-[#E2EEFF] rounded-xl p-6 space-y-6 shadow text-center">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b-2 border-[#426CC2] pb-4 last:border-0 mt-5 w-4/5 mx-auto">

                  <p className="text-lg md:text-2xl text-[#426CC2] mb-3">
                    <span className="font-bold">
                      {t("faq.questionPrefix")} {index + 1}:
                    </span>{" "}
                    <span className="font-semibold">{faq.question}</span>
                  </p>

                  <p className="italic text-[#426CC2] text-base mb-5 text-center relative inline-block">
                    <span className="before:content-['➜'] before:mr-2 before:text-[#426CC2]">
                      {faq.answer}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
        
        <div className="w-full h-[20px] bg-[#0C1A57] mb-2" />
      <Footer />
    </div>
  );
};

export default ServicesPage;
