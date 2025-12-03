/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Atenção: Isso permite deploy com erros de ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Atenção: Isso permite deploy com erros de TypeScript
    ignoreBuildErrors: true,
  },
};

export default nextConfig; // ou module.exports = nextConfig se for JS antigo