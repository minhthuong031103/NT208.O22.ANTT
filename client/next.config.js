// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    /* config options here */
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "*" },
                ]
            }
        ]
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.lifestyleasia.com',
                port: '',
            }
            ,
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'wallpapers.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
                port: ''
            },
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                port: ''
            },
            
        ],
    },
}

module.exports = nextConfig