import React from "react";
import Footer from "../partials/Footer";
import { Quote } from "lucide-react";
import Button from "../Components/Button";

const Homepage: React.FC = () => {
  return (
    <div className="w-full flex flex-col bg-white ">      
      <main>
        {/* Section 1 */}
        <section className="w-full bg-white py-12 px-6">
          <h1
            style={{ fontFamily: "'Calistoga', cursive", fontSize: "4rem" }}
            className="font-bold text-[#0C1A57] mt-3 justify-center text-center"
          >
            Chào mừng đến với PomoRoom
          </h1>
          <div className="flex justify-center mt-6">
            <Button type="submit" size="wide">
                THAM GIA PHÒNG
            </Button>
          </div>
        </section>

        {/* Section 2 */}
        <section className="w-full bg-[#E3EEFF] py-16 px-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0B0D39] mb-8">
            HỌC THEO PHƯƠNG PHÁP <br /> POMODORO LÀ GÌ?
          </h2>
          <div className="relative w-full bg-white text-[#19C3DC] rounded-2xl p-5 md:p-8 leading-relaxed border-4 border-[#17C1DF]">
            <Quote
              size={28}
              className="absolute top-2 left-2 text-[#0B0D39] "
              fill="#0B0D39"
            />
            <p className="text-center">
              <span className="font-semibold">Phương pháp Pomodoro</span> hay còn gọi{" "}
              <span className="italic font-semibold">Phương pháp quả cà chua</span>, 
              là một kỹ thuật quản lý thời gian đơn giản nhưng cực kỳ hiệu quả, giúp bạn 
              tăng cường sự tập trung, nâng cao năng suất và duy trì năng lượng tinh thần 
              một cách bền vững.
            </p>
            <Quote
              size={28}
              className="absolute bottom-4 right-4 rotate-180 text-[#0B0D39]"
              fill="#0B0D39"
            />
          </div>
        </section>

        {/* Section 3 */}
        <section className="w-full bg-white py-12 px-6">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-[#0C1A57] mb-8">
                5 BƯỚC THỰC HIỆN MỘT CHU TRÌNH POMODORO
                </h2>
                <div className="space-y-4">
                <div className="bg-[#426CC2] rounded-[30px] p-4 shadow-lg text-white text-center ">
                    <p><strong className="italic">BƯỚC 1.</strong> Xác định một công việc cụ thể bạn cần hoàn thành.</p>
                </div>
                <div className="bg-[#77D2E2] rounded-[30px] p-4 shadow-lg text-gray-900 text-center">
                    <p><strong className="italic">BƯỚC 2.</strong> Sử dụng đồng hồ bấm giờ và đặt hẹn{" "} <span className="font-semibold">25 phút.</span></p>
                </div>
                <div className="bg-[#426CC2] rounded-[30px] p-4 shadow-lg text-white text-center">
                    <p><strong className="italic">BƯỚC 3.</strong> Hãy{" "}<span className="font-semibold">tập trung 100%</span> vào công việc đã chọn trong khoảng thời gian này.</p>
                </div>
                <div className="bg-[#77D2E2] rounded-[30px] p-4 shadow-lg text-gray-900 text-center">
                    <p><strong className="italic">BƯỚC 4.</strong> Khi hết thời gian, hãy đánh dấu một Pomodoro đã hoàn thành và nghỉ ngơi trong{" "} <span className="font-semibold">5 phút.</span></p>
                </div>
                <div className="bg-[#426CC2] rounded-[30px] p-4 shadow-lg text-white text-center">
                    <p><strong className="italic">BƯỚC 5.</strong> Sau khi hoàn thành 4 Pomodoro, hãy nạp lại năng lượng{" "} <span className="font-semibold">từ 15-30 phút</span> trước khi bắt đầu chu trình mới.</p>
                </div>
                </div>
            </div>
        </section>
        
        {/* Section 4 */}
        <section className="w-full bg-[#E3EEFF] py-12">
            <h2 className="text-4xl font-bold text-center text-[#0C1A57] mb-12">
                LỢI ÍCH VƯỢT TRỘI CỦA PHƯƠNG PHÁP POMODORO
            </h2>

            <div className="space-y-12">
                <div className="flex items-center items-stretch">
                <div className="w-25 h-25 flex items-center justify-center bg-[#17C1DF] text-white text-2xl font-bold">
                    01
                </div>
                <div className="max-w-[60%] border-4 border-[#17C1DF] p-4">
                    <p className="text-[#17C1DF] italic font-semibold">
                    Bằng cách làm việc trong các khoảng thời gian ngắn, bạn sẽ dễ dàng duy trì sự tập trung cao độ và tránh được tình trạng quá tải thông tin.
                    </p>
                </div>
                </div>

                <div className="flex items-center items-stretch justify-end">
                <div className="max-w-[60%] border-4 border-[#17C1DF] p-4 text-right">
                    <p className="text-[#17C1DF] italic font-semibold">
                    Việc theo dõi số lượng Pomodoro cần thiết cho mỗi công việc sẽ giúp bạn lập kế hoạch và ước tính thời gian cho các nhiệm vụ trong tương lai một cách chính xác hơn.
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
                    Các khoảng nghỉ ngắn và dài đều đặn giúp não bộ và cơ thể được phục hồi, ngăn ngừa tình trạng mệt mỏi và duy trì năng lượng làm việc bền bỉ.
                    </p>
                </div>
                </div>

                <div className="flex items-center items-stretch justify-end">
                <div className="max-w-[60%] border-4 border-[#17C1DF] p-4 text-right">
                    <p className="text-[#17C1DF] italic font-semibold">
                    Bạn có thể điều chỉnh linh hoạt thời lượng Pomodoro nếu cần (Ví dụ: 50 phút - 10 phút cho công việc sâu) phù hợp với khả năng tập trung của bản thân.
                    </p>
                </div>
                <div className="w-25 h-25 flex items-center justify-center bg-[#17C1DF] text-white text-2xl font-bold">
                    04
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
