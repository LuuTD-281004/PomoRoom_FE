import { useEffect, useState } from "react";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import http from "@/axios/http";
import { useSettings } from "@/contexts/SettingsContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { getPusherClient } from "@/lib/pusher";
import { User, Users, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface PaymentPackage {
  id: string;
  name: string;
  nameVi: string;
  nameEn: string;
  description: string;
  descriptionVi: string;
  descriptionEn: string;
  price: number;
  status: boolean;
  type: number;
}

export default function PaymentPage() {
  const [packages, setPackages] = useState<PaymentPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<PaymentPackage>();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const { settings } = useSettings();
  const { authenticatedUser, accessToken } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!authenticatedUser) return;
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const pusher = import.meta.env.VITE_PUSHER_AUTH_ENDPOINT;
    const pusherAuthEndpoint = `${serverUrl}${pusher}`;

    const pusherClient = getPusherClient({
      appKey: import.meta.env.VITE_APP_KEY,
      cluster: import.meta.env.VITE_CLUSTER,
      authEndpoint: pusherAuthEndpoint,
      authToken: accessToken || "",
    });

    const channel = pusherClient.subscribe(
      `private-payment-${authenticatedUser.id}`
    );

    channel.bind("payment-result", (data: any) => {
      console.log("Payment event received:", data);
      setShowSuccessPopup(true);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusherClient.disconnect();
    };
  }, [authenticatedUser]);

  const fetchPackages = async () => {
    const response = await http.get("/payment/all-packages");
    setPackages(response.data.result);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSelectPackage = (pkg: PaymentPackage) => {
    if (!authenticatedUser) {
      setShowLoginPrompt(true);
      return;
    }
    
    // Kiểm tra nếu user đã mua gói này rồi
    if (pkg.type === 1 && authenticatedUser?.isPersonalPremium) {
      toast.warning(t("packages.personalPremiumOwned"));
      return;
    }
    if (pkg.type === 2 && authenticatedUser?.isGroupPremium) {
      toast.warning(t("packages.groupPremiumOwned"));
      return;
    }
    
    setSelectedPackage(pkg);
  };

  const handleCloseTransactionConfirmation = async () => {
    navigate("/");
    setShowSuccessPopup(false);
  };

  // Optional: icon map for visual consistency
  const icons = [<User />, <Users />, <UserPlus />, <UserPlus />];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#0C1A57] text-center mb-12">
        {t("packages.choosePaymentPackage")}
      </h2>

      {/* Grid hiển thị các gói */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl w-full justify-center">
        {packages.map((pkg, index) => (
          <Card
            key={pkg.id}
            className="flex flex-col justify-between items-center w-[280px] h-[350px] p-6 rounded-2xl shadow-md bg-gradient-to-b from-[#457FF7] to-[#B3C5EA] text-white"
          >
            {/* Tên + icon + giá */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{icons[index % icons.length]}</span>
                <h3 className="text-lg md:text-xl font-semibold uppercase">
                  {pkg.nameVi}
                </h3>
              </div>

              <div className="w-2/3 h-[2px] bg-white" />

              <p className="text-2xl md:text-3xl font-extrabold">
                {pkg.price.toLocaleString("vi-VN")}₫/Tháng
              </p>
            </div>

            {/* Mô tả */}
            <p className="text-sm md:text-base font-medium italic text-center mt-4 px-2">
              {pkg.descriptionVi}
            </p>

            {/* Nút thanh toán */}
            <Button
              className={`mt-6 px-6 py-2 font-semibold rounded-full text-center transition ${
                (pkg.type === 1 && authenticatedUser?.isPersonalPremium) ||
                (pkg.type === 2 && authenticatedUser?.isGroupPremium)
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-white text-[#0C1A57] hover:bg-gray-100"
              }`}
              onClick={() => handleSelectPackage(pkg)}
              disabled={
                (pkg.type === 1 && authenticatedUser?.isPersonalPremium) ||
                (pkg.type === 2 && authenticatedUser?.isGroupPremium)
              }
            >
              {(pkg.type === 1 && authenticatedUser?.isPersonalPremium) ||
              (pkg.type === 2 && authenticatedUser?.isGroupPremium)
                ? t("packages.alreadyPurchased")
                : t("packages.paymentButton")}
            </Button>
          </Card>
        ))}
      </div>

      {/* Hiển thị QR */}
      <div className="mt-16 flex flex-col items-center justify-center">
        {selectedPackage ? (
          <>
            <img
              src={`https://qr.sepay.vn/img?acc=${settings?.bankAccount}&bank=${
                settings?.bankType
              }&amount=${
                selectedPackage.price
              }&des=${authenticatedUser?.id.replace(
                /-/g,
                ""
              )}${selectedPackage.type}`}
              alt="QR Code"
              className="w-64 h-64 mb-6 rounded-xl border shadow-md"
            />
            <p className="text-gray-700 font-semibold">
              {t("packages.scanQRToComplete")}
            </p>
          </>
        ) : (
          <p className="text-gray-600 italic">
            {t("packages.selectPackageToShowQR")}
          </p>
        )}
      </div>

      {/* Popup thanh toán thành công */}
      <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("packages.paymentSuccess")}</DialogTitle>
          </DialogHeader>
          <p className="text-gray-700 mb-4">
            {t("packages.thankYouTransactionConfirmed")}
          </p>
          <Button
            className="w-full bg-green-600 text-white hover:bg-green-700"
            onClick={handleCloseTransactionConfirmation}
          >
            {t("packages.close")}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Yêu cầu đăng nhập */}
      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("packages.needToLogin")}</DialogTitle>
          </DialogHeader>
          <p className="text-gray-700 mb-4">
            {t("packages.pleaseLoginToContinue")}
          </p>
          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => navigate("/login")}
          >
            {t("packages.login")}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
