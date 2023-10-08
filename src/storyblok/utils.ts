import * as sb from "@storyblok/astro";

export const storyblokApi = (slug: string, params?: sb.ISbStoryParams) => {
  const api = sb.useStoryblokApi();

  return api.get(slug, {
    version:
      import.meta.env.PUBLIC_ENV === "production" ? "published" : "draft",
    ...params,
  });
};
