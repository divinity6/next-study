/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode : false, // 스트릭트 모드로 해당 코드의 무결성 검사 여부( 2번 실행함 : 한번은 검사 )
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // s3 서버에서 이미지를 가져와서 뿌려줌
        hostname: 'hoon-nextjs-demo-users-image.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
