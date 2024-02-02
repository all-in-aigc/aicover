/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "oaidalleapiprodscus.blob.core.windows.net",
      "trysai.s3.us-west-1.amazonaws.com",
      "image-1313856688.cos.ap-guangzhou.myqcloud.com",
    ],
  },
};

export default nextConfig;
