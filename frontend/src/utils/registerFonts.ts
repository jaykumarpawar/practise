import { Font } from "@react-pdf/renderer";

export function registerFonts() {
  // Get base path (works for GitHub Pages & local)
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH && process.env.NODE_ENV === "production"
      ? `/${process.env.NEXT_PUBLIC_BASE_PATH}`
      : "";

  // Prevent duplicate registrations (important if this runs on every render)
  if ((Font as any)._calibriRegistered) return;
  (Font as any)._calibriRegistered = true;

  Font.register({
    family: "Calibri",
    fonts: [
      {
        src: `${basePath}/fonts/calibri-regular.ttf`,
        fontWeight: "normal",
      },
      {
        src: `${basePath}/fonts/calibri-bold.ttf`,
        fontWeight: "bold",
      },
      {
        src: `${basePath}/fonts/calibri-italic.ttf`,
        fontStyle: "italic",
      },
    ],
  });
}
