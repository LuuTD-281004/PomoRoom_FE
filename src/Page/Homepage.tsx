import React from "react";
import Footer from "../partials/Footer";
import { Quote } from "lucide-react";
import Button from "../Components/Button";
import { useTranslation } from "react-i18next";

const Homepage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-w-screen flex flex-col items-center justify-center mt-15">
      <main>
        {/* Section 1 */}
        <section className="w-full min-w-screen flex flex-col items-center justify-center bg-white py-12 px-6">
          <div className="w-full mx-auto text-center">
            <h1
              style={{ fontFamily: "'Calistoga', cursive", fontSize: "4rem" }}
              className="font-bold text-[#0C1A57] mt-3"
            >
              {t("homepage.welcome_title")}
            </h1>
            <div className="flex justify-center mt-6">
              <Button type="submit" size="wide">
                {t("homepage.join_room")}
              </Button>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="w-full bg-[#E3EEFF] py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0B0D39] mb-8">
              {t("homepage.what_is_pomodoro")}
            </h2>
            <div className="relative w-full bg-white text-[#19C3DC] rounded-2xl p-5 md:p-8 leading-relaxed border-4 border-[#17C1DF]">
              <Quote
                size={28}
                className="absolute top-2 left-2 text-[#0B0D39]"
                fill="#0B0D39"
              />
              <p className="text-center">
                <span className="font-semibold">{t("homepage.pomodoro_technique")}</span> {t("homepage.known_as")}{" "}
                <span className="italic font-semibold">{t("homepage.tomato_technique")}</span>, 
                {t("homepage.pomodoro_description")}
              </p>
              <Quote
                size={28}
                className="absolute bottom-4 right-4 rotate-180 text-[#0B0D39]"
                fill="#0B0D39"
              />
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="w-full bg-white py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-[#0C1A57] mb-8">
              {t("homepage.steps_title")}
            </h2>
            <div className="space-y-4">
              <div className="bg-[#426CC2] rounded-[30px] p-4 shadow-lg text-white text-center">
                <p><strong className="italic">{t("homepage.step1")}</strong> {t("homepage.step1_description")}</p>
              </div>
              <div className="bg-[#77D2E2] rounded-[30px] p-4 shadow-lg text-gray-900 text-center">
                <p><strong className="italic">{t("homepage.step2")}</strong>{t("homepage.step2_description")}{" "} 
                  <span className="font-semibold">{t("homepage.25")}</span>
                </p>
              </div>
              <div className="bg-[#426CC2] rounded-[30px] p-4 shadow-lg text-white text-center">
                <p><strong className="italic">{t("homepage.step3")}</strong> {t("homepage.lets")}{" "} 
                  <span className="font-semibold">{t("homepage.focus")}</span> {t("homepage.step3_description")}
                </p>
              </div>
              <div className="bg-[#77D2E2] rounded-[30px] p-4 shadow-lg text-gray-900 text-center">
                <p><strong className="italic">{t("homepage.step4")}</strong> {t("homepage.step4_description")}{" "} 
                  <span className="font-semibold">{t("homepage.5")}</span>
                </p>
              </div>
              <div className="bg-[#426CC2] rounded-[30px] p-4 shadow-lg text-white text-center">
                <p><strong className="italic">{t("homepage.step5")}</strong> {t("homepage.step5_description1")}{" "} 
                  <span className="font-semibold">{t("homepage.minutes")}</span> {t("homepage.step5_description2")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="w-full bg-[#E3EEFF] py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-[#0C1A57] mb-12">
              {t("homepage.benefits_title")}
            </h2>

            <div className="space-y-12">
              <div className="flex items-center items-stretch">
                <div className="w-25 h-25 flex items-center justify-center bg-[#17C1DF] text-white text-2xl font-bold">
                  01
                </div>
                <div className="max-w-[60%] border-4 border-[#17C1DF] p-4">
                  <p className="text-[#17C1DF] italic font-semibold">
                    {t("homepage.benefit1")}
                  </p>
                </div>
              </div>

              <div className="flex items-center items-stretch justify-end">
                <div className="max-w-[60%] border-4 border-[#17C1DF] p-4 text-right">
                  <p className="text-[#17C1DF] italic font-semibold">
                    {t("homepage.benefit2")}
                  </p>
                </div>
                <div className="w-25 h-25 flex items-center justify-center bg-[#17C1DF] text-white text-2xl font-bold">
                  02
                </div>
              </div>

              <div className="flex items-center items-stretch">
                <div className="w-25 h-25 flex items-center justify-center bg-[#17C1DF] text-white text-2xl font-bold">
                  03
                </div>
                <div className="max-w-[60%] border-4 border-[#17C1DF] p-4">
                  <p className="text-[#17C1DF] italic font-semibold">
                    {t("homepage.benefit3")}
                  </p>
                </div>
              </div>

              <div className="flex items-center items-stretch justify-end">
                <div className="max-w-[60%] border-4 border-[#17C1DF] p-4 text-right">
                  <p className="text-[#17C1DF] italic font-semibold">
                    {t("homepage.benefit4")}
                  </p>
                </div>
                <div className="w-25 h-25 flex items-center justify-center bg-[#17C1DF] text-white text-2xl font-bold">
                  04
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="w-full h-[20px] bg-[#0C1A57] mb-2" />
      <Footer />
    </div>
  );
};

export default Homepage;
