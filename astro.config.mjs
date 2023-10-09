import { defineConfig } from 'astro/config';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
const env = loadEnv("", process.cwd(), 'STORYBLOK');

// https://astro.build/config
export default defineConfig({
  integrations: [storyblok({
    bridge: process.env.PUBLIC_ENV === 'preview' || process.env.PUBLIC_ENV === 'development',
    accessToken: env.STORYBLOK_TOKEN,
    enableFallbackComponent: true,
    components: {
      blogPost: 'storyblok/BlogPost',
      blogPostList: 'storyblok/BlogPostList',
      page: 'storyblok/Page',
      title: 'storyblok/Title',
    },
    apiOptions: {
      region: 'us'
    }
  }), tailwind()],
  output: process.env.PUBLIC_ENV === 'preview' ? 'server' : 'static',
  adapter: process.env.PUBLIC_ENV === 'preview' ? vercel() : undefined,
});