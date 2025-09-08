import { Font } from "@react-pdf/renderer";

// Determine base path (needed for GitHub Pages deployment)
const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH && process.env.NODE_ENV === "production"
        ? `/${process.env.NEXT_PUBLIC_BASE_PATH}`
        : "";

export function registerFonts() {
    Font.register({
        family: "Calibri",
        fonts: [
            { src: `${basePath}/fonts/calibri-regular.ttf` },
            { src: `${basePath}/fonts/calibri-bold.ttf`, fontWeight: "bold" },
            { src: `${basePath}/fonts/calibri-italic.ttf`, fontStyle: "italic" },
        ],
    });
}
