import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
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
import Pusher from "pusher-js";
import { getPusherClient } from "@/lib/pusher";

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
}

export default function PaymentPage() {
  const [packages, setPackages] = useState<PaymentPackage[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const { settings } = useSettings();
  const { authenticatedUser, accessToken } = useAuth();
  const navigate = useNavigate();

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
      `private-payment-${authenticatedUser.sub}`
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
    setSelectedPrice(pkg.price);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section */}
      <div className="w-1/2 bg-blue-500 p-8 text-white">
        <h1 className="text-2xl font-bold mb-6">THANH TOÁN GÓI</h1>
        <div className="grid grid-cols-2 gap-4">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className="bg-blue-400 text-white rounded-2xl shadow-lg flex flex-col"
            >
              <CardHeader>
                <CardTitle>{pkg.nameVi}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <p className="text-lg font-semibold">
                  {pkg.price.toLocaleString("vi-VN")}₫/Tháng
                </p>
                <p className="text-sm mt-2">{pkg.descriptionVi}</p>
                <div className="mt-auto">
                  <Button
                    className="w-full bg-white text-blue-600 hover:bg-gray-100"
                    onClick={() => handleSelectPackage(pkg)}
                  >
                    Thanh toán
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8">
        {selectedPrice ? (
          <img
            src={`https://qr.sepay.vn/img?acc=${settings?.bankAccount}&bank=${
              settings?.bankType
            }&amount=${selectedPrice}&des=${authenticatedUser?.sub.replace(
              /-/g,
              ""
            )}`}
            alt="QR Code"
            className="w-64 h-64 mb-6"
          />
        ) : (
          <p className="text-gray-600">Vui lòng chọn gói để hiển thị QR</p>
        )}
      </div>

      <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thanh toán thành công!</DialogTitle>
          </DialogHeader>
          <p className="text-gray-700 mb-4">
            Cảm ơn bạn, giao dịch của bạn đã được xác nhận.
          </p>
          <Button
            className="w-full bg-green-600 text-white hover:bg-green-700"
            onClick={() => setShowSuccessPopup(false)}
          >
            Đóng
          </Button>
        </DialogContent>
      </Dialog>

      {/* Login Prompt Dialog */}
      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bạn cần đăng nhập</DialogTitle>
          </DialogHeader>
          <p className="text-gray-700 mb-4">
            Vui lòng đăng nhập để tiếp tục thanh toán gói dịch vụ.
          </p>
          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
