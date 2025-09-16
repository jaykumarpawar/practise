export function getAssetUrl(path: string) {
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH &&
      process.env.NODE_ENV === "production"
      ? `/${process.env.NEXT_PUBLIC_BASE_PATH}`
      : "";
  return `${basePath}${path}`;
}
