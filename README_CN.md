# AI 红包封面生成器

使用 AI 技术生成精美的微信红包封面。

## 在线演示

[https://aicover.design](https://aicover.design)

![demo](./preview.png)

## 快速开始

1. 克隆项目

```shell
git clone https://github.com/all-in-aigc/aicover
```

2. 安装依赖

```shell
cd aicover
pnpm install
```

3. 初始化数据库

使用本地数据库： [local postgres](https://wiki.postgresql.org/wiki/Homebrew)

或者使用在线数据库： [vercel-postgres](https://vercel.com/docs/storage/vercel-postgres)

或者使用在线数据库： [supabase](https://supabase.com/)

在 `data/install.sql` 文件中复制创建数据库用到的 sql

4. 设置环境变量

在 `aicover` 项目根目录下创建一个 `.env.local` 文件，填入如下的配置内容：

```
OPENAI_API_KEY=""

POSTGRES_URL=""

AWS_AK=""
AWS_SK=""
AWS_REGION=""
AWS_BUCKET=""

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

STRIPE_PUBLIC_KEY=""
STRIPE_PRIVATE_KEY=""

WEB_BASE_URI=""
```

5. 本地开发

```shell
pnpm dev
```

打开 `http://localhost:3000` 预览并调试

## 感谢以下项目

- [aiwallpaper](https://aiwallpaper.shop) 提供代码模板
- [nextjs](https://nextjs.org/docs) 全栈开发框架
- [clerk](https://clerk.com/docs/quickstarts/nextjs) 用户鉴权
- [aws s3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html) 图片存储
- [stripe](https://stripe.com/docs/development) 支付
- [node-postgres](https://node-postgres.com/) 数据处理库
- [tailwindcss](https://tailwindcss.com/) 快速实现页面样式

## 其他

你可以在 Twitter 上关注我: https://twitter.com/idoubicc

如果这个项目对你有帮助，你可以请我喝杯咖啡：

<a href="https://www.buymeacoffee.com/idoubi" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

> 如果你想学习全栈开发，实现类似的产品，你可以参加我的 [全栈开发课程](https://mp.weixin.qq.com/s/4duIpeZkmqlKPa4jrcUdIA)
