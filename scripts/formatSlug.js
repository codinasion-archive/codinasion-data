export default function formatSlug(slug) {
  slug = slug.replace(/programme\//, "");
  slug = slug.replace(/\/(README|index|Readme)/, "");
  slug = slug.replace(/\.(mdx|md)/, "");
  return slug;
}
