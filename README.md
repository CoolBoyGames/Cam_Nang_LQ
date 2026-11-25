# Cẩm nang khắc chế Liên Quân

Ứng dụng web tra cứu tướng khắc chế, trang bị đối phó, mẹo cấm chọn, đi đường và kỹ năng chung trong **Liên Quân Mobile**.

## Tính năng chính

- **Trang chủ**: Thống kê tổng quan số tướng, gợi ý khắc chế và top tướng/trang bị xuất hiện nhiều nhất.
- **Tra cứu tướng (`#heroes`)**: Tìm kiếm theo tên tướng, tên tướng khắc chế hoặc tên trang bị; lọc theo nhóm trang bị, chữ cái đầu A–Z, chọn tướng ngẫu nhiên và phím tắt nhanh (`/` để tìm, `Esc` để đặt lại).
- **Trang bị (`#items`)**: Phân loại nhóm công dụng (Kháng hiệu ứng, Giáp vật lý, Giáp phép, Chống hồi máu, Xuyên giáp, Khác) và danh sách tướng đối đầu tương ứng.
- **Cấm chọn (`#banpick`)**: Gợi ý chọn trước (First Pick), tướng nên giấu bài, top tướng bị cấm cao và công cụ **5 ô Draft Board** chọn đội hình địch để gợi ý tướng & trang bị khắc chế.
- **Đi đường & Giao tranh (`#laning`)**, **Kỹ năng chung (`#skills`)**, **Bảng khắc chế đầy đủ (`#table`)**: Tổng hợp mẹo farm, đọc minimap, ping và đổi trang bị theo tình huống.
- **Giao diện Sáng / Tối**: Hỗ trợ chuyển đổi trực tiếp trên thanh điều hướng và tự động lưu lựa chọn.

## Công nghệ sử dụng

- **TypeScript** + **Vite**
- **Tailwind CSS v4**
- **GitHub Actions** (CI/CD tự động kiểm tra & deploy lên GitHub Pages)

## Chạy dự án trên máy (Local)

### Cách 1: Khởi động nhanh trên Windows
Nhấp đúp vào tệp [`start.bat`](start.bat) để tự động cài đặt thư viện (nếu chưa có) và mở trình duyệt.

### Cách 2: Dùng dòng lệnh
Yêu cầu máy đã cài **Node.js** (khuyến nghị bản 20+) và **pnpm** (hoặc `npm`).

```bash
# Cài đặt thư viện
pnpm install

# Chạy môi trường phát triển
pnpm dev

# Kiểm tra TypeScript và build bản production
pnpm run build
```

## Cấu trúc thư mục

```text
├── .github/workflows/deploy.yml   # CI/CD kiểm tra build & deploy GitHub Pages
├── index.html                     # Điểm vào HTML & Google Fonts
├── src/
│   ├── components/render.ts       # Các component UI dùng chung & SVG icons
│   ├── data/                      # Dữ liệu tướng, trang bị và hướng dẫn
│   ├── pages/pages.ts             # Nội dung các trang
│   ├── utils/format.ts            # Hàm xử lý chuỗi và định dạng
│   ├── main.ts                    # Routing, bộ lọc và tương tác chính
│   ├── style.css                  # Theme tokens & Tailwind CSS
│   └── types.ts                   # Định nghĩa kiểu TypeScript
├── start.bat                      # Script khởi động nhanh trên Windows
└── vite.config.ts                 # Cấu hình Vite
```

## Tự động Deploy (GitHub Pages)

Repo sử dụng workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
- Tự động chạy `pnpm run build` (`tsc --noEmit && vite build`) cho mọi Pull Request và push vào `main`.
- Chỉ deploy lên GitHub Pages khi bước kiểm tra & build trên nhánh `main` thành công.
- Để bật trên GitHub: vào **Settings → Pages → Build and deployment → Source** và chọn **GitHub Actions**.

## Nguồn dữ liệu

Dữ liệu khắc chế và bài viết tổng hợp từ **Sforum** cùng các hướng dẫn cộng đồng tiếng Việt (mang tính tham khảo).
