import "semantic-ui-css/semantic.min.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auto Palette",
    description: "Count colors of automobiles out in the world!"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
