# Cloudflare Functions to Express Project

这是一个从 Cloudflare Functions 转换而来的 Express 项目。

## 项目结构
- `data/`: 存放KV命名空间对应的JSON文件
- `dataHandler.js`: 数据处理路由
- `loginHandler.js`: 登录处理路由
- `qaHandler.js`: 问答处理路由
- `registerHandler.js`: 注册处理路由
- `signUpHandler.js`: 报名处理路由
- `voteHandler.js`: 投票处理路由
- `index.js`: Express 服务器入口文件
- `package.json`: 项目配置文件

## 安装依赖
```bash
npm install
```

## 启动项目
```bash
npm start
```

## 开发模式启动
```bash
npm run dev
```

## 数据存储
所有数据存储在 `data/` 目录下的 JSON 文件中，每个 KV 命名空间对应一个文件。

## 路由说明
- `/dataHandler`: 数据处理
- `/loginHandler`: 登录处理
- `/qaHandler`: 问答处理
- `/registerHandler`: 注册处理
- `/signUpHandler`: 报名处理
- `/voteHandler`: 投票处理