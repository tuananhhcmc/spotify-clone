# Hướng dẫn sử dụng Spotify-clone

## Cách cài đặt và sử dụng Spotify-clone

#### Bước 1 : 

Clone Repository on Terminal Window 
```console
git clone https://github.com/tuananhhcmc/spotify-clone
```
```console
cd spotify-clone
```
```console
code .
```
#### Bước 2 : 

Sau khi vào dự án thông qua VSCode vào Terminal > New Terminal gõ 

```console
yarn install
```
để thực hiện cài đặt dependencies

#### Bước 3 :
Tạo file .env.local trong thư mục gốc của dự án.

Thêm các biến môi trường sau (lấy từ Spotify Developer Dashboard):

```console
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

#### Bước 4 :
Sau khi hoàn thành xong gõ vào Terminal để chạy dự án

```console
yarn dev
```
Sau khi khởi chạy dự án Gõ vào thanh điều hướng URL : [localhost](http://localhost:3000)


