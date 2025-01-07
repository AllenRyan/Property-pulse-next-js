/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
           protocol: 'https',
           hostname: 'lh3.googleusercontent.com',
           pathname: '**',
            },
            {
           protocol: 'https',
           hostname: 'res.cloudinary.com',
           pathname: '**',
            },
        ],
    },
    serverActions: {
        bodySizeLimit: '5mb'  // Adjust the size as needed (e.g., '10mb')
      }
};

export default nextConfig;
