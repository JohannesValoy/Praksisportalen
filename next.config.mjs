const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["knex", "mysql2", "daisyui"],
    outputFileTracingIncludes: {
      "/src/knex": ["./src/knex/**/*.ts"],
    },
  },
};

export default nextConfig;
