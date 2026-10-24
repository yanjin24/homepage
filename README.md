# 小岛笔记 · GitHub Pages

一个用于练习从零搭建并部署静态网站的内容分享 demo。页面围绕阅读笔记、生活观察和实用清单展开，不包含个人介绍、联系方式或社交账号。

- 技术：原生 HTML + CSS + JavaScript
- 特性：深浅色主题、响应式导航、文章展开阅读、滚动进场动画
- 依赖：无框架、无构建步骤、无外部 CDN
- 部署：GitHub Pages 直接发布仓库根目录

## 目录结构

```text
github-pages/
├── index.html      页面与分享内容
├── README.md       项目说明
├── .nojekyll       关闭 Pages 的 Jekyll 预处理
└── assets/
    ├── style.css   主题、布局与响应式样式
    └── main.js     主题切换、移动菜单与滚动交互
```

## 本地预览

直接双击 `index.html` 即可预览。也可以在项目目录运行 `python -m http.server 8000`，再访问 `http://localhost:8000`。

## 部署到 GitHub Pages

1. 初始化并提交代码：

   ```bash
   git init -b main
   git add .
   git commit -m "feat: 初始化内容分享网站"
   ```

2. 在 GitHub 创建一个空的公开仓库，不要额外生成 README，然后关联并推送：

   ```bash
   git remote add origin https://github.com/<用户名>/<仓库名>.git
   git push -u origin main
   ```

3. 打开仓库的 **Settings → Pages**，在 **Build and deployment** 中选择：
   - **Source**：`Deploy from a branch`
   - **Branch**：`main`
   - **Folder**：`/ (root)`

4. 保存后等待部署完成，访问 `https://<用户名>.github.io/<仓库名>/`。通常需要 1～3 分钟，可在仓库的 **Actions** 页面查看部署状态。

所有静态资源均使用相对路径，因此也适用于 `<用户名>.github.io` 用户站点或自定义域名。后续修改内容并推送到 `main`，Pages 会自动重新部署。

## 修改内容

- 在 `index.html` 的 `#notes` 区域增删文章，在 `#lists` 区域修改清单。
- 在 `assets/style.css` 的 `:root` 中修改颜色、宽度和圆角等变量。
- 页面标题、描述与站点名位于 `index.html` 顶部和导航区域。
