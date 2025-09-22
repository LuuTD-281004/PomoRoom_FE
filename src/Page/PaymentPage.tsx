import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

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

  useEffect(() => {
    axios.get("/api/payment-packages").then((res) => {
      setPackages(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section */}
      <div className="w-1/2 bg-blue-500 p-8 text-white">
        <h1 className="text-2xl font-bold mb-6">THANH TOÁN GÓI</h1>
        <div className="grid grid-cols-2 gap-4">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className="bg-blue-400 text-white rounded-2xl shadow-lg"
            >
              <CardHeader>
                <CardTitle>{pkg.nameVi}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">
                  {pkg.price.toLocaleString("vi-VN")}₫/Tháng
                </p>
                <p className="text-sm mt-2">{pkg.descriptionVi}</p>
                <Button className="w-full mt-4 bg-white text-blue-600 hover:bg-gray-100">
                  Thanh toán
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <img
          src="/qr-code.png"
          alt="QR Code"
          className="w-64 h-64 mb-6"
        />
        <div className="text-lg text-gray-700 space-y-2">
          <p><strong>Số tài khoản:</strong> 123456789</p>
          <p><strong>Ngân hàng:</strong> Vietcombank</p>
          <p><strong>Tên tài khoản:</strong> NGUYEN VAN A</p>
        </div>
      </div>
    </div>
  );
}
