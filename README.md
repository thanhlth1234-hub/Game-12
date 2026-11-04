# Đấu Trường Sinh Tồn Hóa Học - Amine Quiz (Real-time)

Hệ thống trắc nghiệm loại dần theo thời gian thực (Battle Royale Trivia) dành cho hội trường sự kiện, viết trên nền tảng **Node.js + Express + Socket.IO**. Toàn bộ trạng thái trận đấu được lưu trực tiếp trong RAM server, giúp độ trễ đạt mức thấp nhất.

---

## 1. Cấu Trúc Thư Mục Chuẩn Bị
```text
survival-quiz/
├── public/
│   ├── index.html          # Giao diện người chơi
│   └── admin.html          # Bảng điều khiển MC / Host (có mã QR)
├── src/
│   ├── data/
│   │   └── questions.js    # Bộ 10 câu hỏi Amine & Quota từng vòng
│   ├── gameState.js        # Logic máy trạng thái trên RAM & đo mili-giây
│   └── socketHandlers.js   # Bộ lắng nghe sự kiện Socket.IO
├── package.json
├── server.js
└── README.md
```

---

## 2. Kiểm Thử Trực Tiếp Trên Máy Tính Cá Nhân (Local)

1. Mở Terminal / Command Prompt tại thư mục dự án `survival-quiz`.
2. Cài đặt các gói phụ thuộc:
   ```bash
   npm install
   ```
3. Chạy máy chủ:
   ```bash
   npm start
   ```
4. Truy cập trình duyệt:
   * **Giao diện Người chơi:** `http://localhost:3000/index.html`
   * **Bảng điều khiển MC/Admin:** `http://localhost:3000/admin.html`

---

## 3. Hướng Dẫn Đưa Lên GitHub

1. Cài đặt Git trên máy tính (nếu chưa có).
2. Mở Terminal tại thư mục `survival-quiz` và chạy lần lượt các lệnh sau:
   ```bash
   git init
   git add .
   git commit -m "Khoi tao he thong dau truong Amine"
   git branch -M main
   ```
3. Truy cập [GitHub](https://github.com), đăng nhập và chọn **New Repository**:
   * Repository name: `survival-quiz`
   * Chọn chế độ: **Public**
   * Bấm **Create repository**.
4. Copy 2 dòng lệnh đẩy code từ GitHub và dán vào Terminal của bạn:
   ```bash
   git remote add origin https://github.com/<tai-khoan-cua-ban>/survival-quiz.git
   git push -u origin main
   ```

---

## 4. Hướng Dẫn Deploy Lấy Link Public Miễn Phí

Do hệ thống sử dụng WebSocket liên tục (Stateful), bạn cần nền tảng hỗ trợ giữ Web Service chạy online. Khuyến nghị sử dụng **Render.com** (hoặc **Railway.app**).

### Cách 1: Triển khai trên Render.com (Khuyên Dùng - Hoàn Toàn Miễn Phí)
1. Truy cập [Render.com](https://render.com) và đăng nhập bằng tài khoản GitHub.
2. Tại trang Dashboard, bấm **New +** -> Chọn **Web Service**.
3. Chọn tùy chọn **Build and deploy from a Git repository** -> Bấm **Next**.
4. Tìm và bấm **Connect** vào kho lưu trữ `survival-quiz` vừa tạo trên GitHub.
5. Cấu hình các thông số:
   * **Name:** `survival-quiz-amine` (hoặc tên tùy chọn).
   * **Region:** Singapore (để có độ trễ kết nối thấp nhất từ Việt Nam).
   * **Runtime:** Node
   * **Build Command:** `npm install`
   * **Start Command:** `npm start`
   * **Instance Type:** Free (512 MB RAM - đủ tải 200–500 thí sinh đồng thời).
6. Bấm **Deploy Web Service**.
7. Chờ 1–2 phút cho server build xong. Render sẽ cấp một đường link HTTPS có dạng:
   `https://survival-quiz-amine.onrender.com`

---

## 5. Vận Hành Trong Sự Kiện Thực Tế

1. **Chuẩn bị trước giờ bắt đầu:**
   * MC / Ban tổ chức mở đường link Admin trên máy tính xách tay:  
     `https://survival-quiz-amine.onrender.com/admin.html`
   * Kết nối máy tính ra màn hình máy chiếu hội trường hoặc đưa mã QR trên trang Admin lên màn hình lớn.
2. **Thí sinh tham gia:**
   * Người chơi dùng camera điện thoại quét mã QR hoặc truy cập trực tiếp:  
     `https://survival-quiz-amine.onrender.com/index.html`
   * Thí sinh nhập tên và bấm **Tham gia ngay** để vào phòng chờ.
3. **Điều khiển trận đấu:**
   * Khi đủ thí sinh, Host bấm **Phát câu tiếp theo**.
   * Hệ thống tự động đếm ngược 30 giây, tính toán thời gian phản hồi theo mili-giây, lọc top thí sinh hợp lệ theo từng câu và tự động chuyển người bị loại sang **Chế độ theo dõi**.
