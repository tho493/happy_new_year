<!-- HEADER -->
<div align="center">
  <h3 align="center">Happy New Year</h3>

  <p align="center">
    Dự án cá nhân giúp mọi người gửi lời chúc mừng năm mới một cách ý nghĩa hơn
    <br />
    <a href="https://happy-new-year-for-you.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/tho493/happy_new_year/issues/new">Report Bug</a>
    ·
    <a href="https://github.com/tho493/happy_new_year/issues/new">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## Thông tin về project

Dự án Happy New Year là một ứng dụng web cho phép người dùng tạo và gửi những lời chúc năm mới ý nghĩa đến người thân yêu của họ. Với giao diện đơn giản và thân thiện, người dùng có thể dễ dàng:

- Tạo lời chúc năm mới với nội dung và hình ảnh tùy chỉnh
- Tự động tạo link chia sẻ độc đáo cho từng lời chúc
- Hiển thị đồng hồ đếm ngược đến thời khắc giao thừa
- Hiệu ứng pháo hoa và animation đẹp mắt khi đến thời khắc năm mới

<!-- GETTING STARTED -->

## Getting Started

Hướng dẫn cài đặt và chạy project trên máy local.

### Yêu cầu

Cần có các tài khoản và dịch vụ sau:

- Node.js và npm (Node Package Manager)
- Git
- Tài khoản Firebase và Realtime Database đã được tạo
- Tài khoản Cloudinary để lưu trữ hình ảnh

### Cài đặt

1. Clone repository về máy

   ```sh
   git clone https://github.com/tho493/happy_new_year.git
   ```

2. Di chuyển vào thư mục project

   ```sh
   cd happy_new_year
   ```

3. Cài đặt các package cần thiết

   ```sh
   npm install
   ```

4. Tạo tài khoản và lấy thông tin API:

   a. Cloudinary:

   - Đăng ký tài khoản tại https://cloudinary.com
   - Vào Dashboard để lấy Cloud name, API Key và API Secret
   - Cloudinary URL sẽ có dạng: cloudinary://{api_key}:{api_secret}@{cloud_name}

   b. Firebase:

   - Truy cập https://console.firebase.google.com
   - Tạo project mới
   - Vào Project Overview > Add Web App (</>) để thêm ứng dụng web
   - Đặt tên cho ứng dụng và click "Register app"
   - Tải file cấu hình (firebaseConfig.json) về máy
   - Tạo Realtime Database và copy URL database

5. Tạo file .env và thêm các thông tin API

   ```
   API_KEY=your_api_key_here (option)
   # cloundinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   CLOUDINARY_URL=your_cloudinary_url
   # firebase
   FIREBASE_APIKEY=your_firebase_api_key
   authDomain=your_project_id.firebaseapp.com
   databaseURL=your_database_url
   projectId=your_project_id
   storageBucket=your_project_id.appspot.com
   messagingSenderId=your_messaging_sender_id
   appId=your_app_id
   measurementId=your_measurement_id
   ```

6. Chạy project
   ```sh
   npm start
   ```

Project sẽ chạy tại địa chỉ http://localhost:3000

## Cách sử dụng

1. Truy cập website: https://happy-new-year-for-you.vercel.app

2. Tạo lời chúc mới:

   - Click vào nút "Tạo Lời Chúc Ngay"
   - Điền các thông tin:
     - Tên người chúc
     - Tiêu đề lời chúc
     - Nội dung lời chúc
     - Upload hình ảnh của người nhận
   - Click "Gửi Lời Chúc" để hoàn tất

3. Chia sẻ lời chúc:
   - Copy link được tạo ra
   - Gửi link cho người nhận qua tin nhắn, email,...
4. Xem lời chúc:
   - Người nhận truy cập vào link được chia sẻ
   - Trước thời khắc giao thừa: Hiển thị đồng hồ đếm ngược
   - Sau thời khắc giao thừa: Hiển thị lời chúc kèm hiệu ứng

Lưu ý: Lời chúc sẽ chỉ hiển thị sau thời khắc giao thừa, trước đó sẽ hiển thị đồng hồ đếm ngược để tạo bất ngờ cho người nhận.

<!-- CONTACT -->

## Contact

Nguyễn Chí Thọ - [@tho493](https://facebook.com/tho493) - chitho040903@gmail.com
<br>

Project Link: [https://github.com/tho493/happy_new_year](https://github.com/tho493/happy_new_year)

## Lời cảm ơn

Cảm ơn bạn đã sử dụng website của tôi! ❤️

Sự ủng hộ của các bạn là động lực để tôi tiếp tục phát triển và cải thiện dự án này tốt hơn.

Chúc các bạn một năm mới An Khang Thịnh Vượng! 🎊

---

Feel free to contribute to this project by opening issues or submitting pull requests!
