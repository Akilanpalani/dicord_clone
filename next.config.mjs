/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commanjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    });
    return config;
  },
  images: {
    domains: ['utfs.io'],
  },
};

export default nextConfig;
