# 兒保樂園｜3D 互動概念原型

以 React + Three.js / React Three Fiber 製作的展示型 Prototype。

## 本機啟動
需要 Node.js 18 或以上。

```bash
npm install
npm run dev
```

瀏覽器開啟終端機顯示的網址。

## 建置
```bash
npm run build
npm run preview
```

## 部署到 Vercel
1. 將此資料夾上傳到 GitHub repository。
2. 登入 Vercel，選擇 Add New → Project，匯入 repository。
3. Framework Preset 選 Vite（通常會自動偵測）。
4. Build Command：`npm run build`
5. Output Directory：`dist`
6. 按 Deploy，完成後即可取得公開網址。

也可部署到 Netlify：Build command `npm run build`，Publish directory `dist`。

## 目前原型內容
- 3D 微縮浮島、六個主題建築與互動熱點
- 自動慢速旋轉、滑鼠／觸控拖曳旋轉、滾輪／雙指縮放
- 建築點選與六主題快速入口
- 毛玻璃主題彈窗、開始測驗示意按鈕
- 熱氣球浮動、彩色粒子飄落、樹木與柔和陰影
- RWD 導覽列與手機版版面

## 後續可替換
目前建築是程式化幾何模型，方便先確認互動與整體概念。正式提案可再替換成精緻模型（GLB/GLTF），並串接實際測驗內容、影片與會員功能。
