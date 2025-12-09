# CTF Portfolio - Static Version

## 📁 Cấu trúc thư mục public_html

Thư mục `public_html` chứa tất cả các file tĩnh (HTML, CSS, JS, hình ảnh) sẵn sàng để upload lên hosting:

```
public_html/
├── index.html          # Trang chính (static HTML)
├── css/
│   └── style.css      # File CSS gốc
├── js/
│   ├── app.js         # JavaScript chính (đã loại bỏ API calls)
│   ├── data.js        # Dữ liệu team (thay thế backend)
│   └── matrix.js      # Hiệu ứng matrix
└── images/
    ├── logo.png
    ├── BaoZ.jpg
    ├── Tanh.jpg
    └── default-avatar.png
```

## 🚀 Hướng dẫn upload lên hosting

### Bước 1: Chuẩn bị file
Tất cả các file cần thiết đã có trong thư mục `public_html`

### Bước 2: Upload lên hosting
1. Đăng nhập vào hosting của bạn (cPanel, FTP, hoặc File Manager)
2. Tìm thư mục `public_html` trên hosting
3. Upload TẤT CẢ nội dung trong thư mục `public_html` local lên thư mục `public_html` trên hosting:
   - `index.html`
   - Thư mục `css/`
   - Thư mục `js/`
   - Thư mục `images/`

### Bước 3: Kiểm tra
- Truy cập domain của bạn (ví dụ: `https://yourdomain.com`)
- Trang web sẽ hiển thị ngay lập tức

## ✏️ Cách chỉnh sửa nội dung

### Thay đổi thông tin team
Mở file `public_html/js/data.js` và chỉnh sửa object `teamData`:

```javascript
const teamData = {
    name: '6h4T9pTpR0',
    description: 'Mô tả team của bạn...',
    
    members: [
        {
            name: 'Tên thành viên',
            role: 'Vai trò',
            bio: 'Tiểu sử',
            email: 'email@example.com',
            avatar: 'images/avatar.jpg'
        }
    ],
    
    achievements: [
        {
            title: 'Thành tích',
            description: 'Mô tả thành tích',
            year: 2024
        }
    ],
    
    skills: [
        { name: 'Kỹ năng', icon: 'fa-icon-name' }
    ]
};
```

### Thêm/thay đổi hình ảnh
1. Upload hình ảnh vào thư mục `public_html/images/`
2. Cập nhật đường dẫn trong `data.js` hoặc `index.html`

### Thay đổi giao diện
Chỉnh sửa file `public_html/css/style.css`

## 🌐 Tính năng

✅ **Không cần backend/PHP** - Chỉ HTML, CSS, JavaScript
✅ **Chuyển đổi ngôn ngữ** - Tiếng Việt / English
✅ **Responsive** - Tự động điều chỉnh trên mọi thiết bị
✅ **Hiệu ứng động** - Animations và transitions mượt mà
✅ **SEO friendly** - Cấu trúc HTML tối ưu

## 📝 Lưu ý quan trọng

1. **Không còn PHP**: Tất cả file `.php` đã được chuyển thành `.html` tĩnh
2. **Không có API calls**: Dữ liệu được load trực tiếp từ `js/data.js`
3. **Chuyển ngôn ngữ**: Sử dụng localStorage, không cần reload trang
4. **Hình ảnh**: Đảm bảo tất cả hình ảnh có trong thư mục `images/`

## 🔧 Tùy chỉnh nâng cao

### Thêm thành viên mới
Trong `js/data.js`, thêm object vào mảng `members`:

```javascript
members: [
    // ... existing members
    {
        name: 'New Member',
        handle: 'handle',
        role: 'Role',
        bio: 'Bio text',
        email: 'email@example.com',
        avatar: 'images/newmember.jpg',
        socials: {
            github: 'https://github.com/username',
            twitter: 'https://twitter.com/username'
        }
    }
]
```

### Thêm thành tích
```javascript
achievements: [
    // ... existing achievements
    {
        title: 'New Achievement',
        description: 'Description',
        year: 2024,
        type: 'event'
    }
]
```

### Thêm kỹ năng
```javascript
skills: [
    // ... existing skills
    { name: 'New Skill', icon: 'fa-icon-name' }
]
```

Xem danh sách icons tại: https://fontawesome.com/icons

## 🆘 Troubleshooting

**Hình ảnh không hiển thị?**
- Kiểm tra đường dẫn trong `data.js`
- Đảm bảo file hình ảnh đã được upload

**Không chuyển được ngôn ngữ?**
- Kiểm tra console (F12) xem có lỗi JavaScript
- Xóa cache trình duyệt

**Giao diện bị lỗi?**
- Kiểm tra file `css/style.css` đã được upload đúng
- Xóa cache và tải lại trang

## 📧 Liên hệ

Nếu cần hỗ trợ, liên hệ team 6h4T9pTpR0
