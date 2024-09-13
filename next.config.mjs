/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding');
      patchWasmModuleImport(config, isServer);
  
      if (!isServer) {
        config.output.environment = { ...config.output.environment, asyncFunction: true };
      }
      return config
      },
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
      env: {
        ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
      },
  }
  function patchWasmModuleImport(config, isServer) {
    config.experiments = Object.assign(config.experiments || {}, {
      asyncWebAssembly: true,
      layers: true,
      topLevelAwait: true
    });
  
    config.optimization.moduleIds = 'named';
  
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });
  
    // TODO: improve this function -> track https://github.com/vercel/next.js/issues/25852
    if (isServer) {
      config.output.webassemblyModuleFilename = './../static/wasm/tfhe_bg.wasm';
    } else {
      config.output.webassemblyModuleFilename = 'static/wasm/tfhe_bg.wasm';
    }
  }
  
export default nextConfig;
