/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://backend-practice.codebootcamp.co.kr/graphql/:path*',  // 실제 GraphQL 서버 URL
      },
    ];
  },
};

export default nextConfig;
