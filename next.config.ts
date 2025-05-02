/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/member",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
