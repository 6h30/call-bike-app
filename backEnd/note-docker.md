
cài docker qua homebrew 
sử dụng Docker trên máy chủ Docker
(cài đặt Docker bằng Homebrew trên macOS, Docker Desktop sẽ không được sử dụng. Thay vào đó, Docker sẽ chạy trên máy chủ Docker trên macOS)

```docker --version```
//kiểm tra docker có chạy hay chưa: 
```ps aux | grep dockerd```
 đã cài đặt Docker bằng Homebrew, thì Docker daemon sẽ không được khởi chạy tự động khi bạn khởi động máy tính. Bạn có thể khởi động Docker daemon bằng lệnh sau:
 
```brew services start docker```