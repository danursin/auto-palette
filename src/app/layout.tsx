import "semantic-ui-css/semantic.min.css";

import { Grid, Menu, MenuItem } from "semantic-ui-react";

import Link from "next/link";
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
            <body>
                <Menu>
                    <MenuItem icon="car" header as={Link} href="/" content="Auto Palette" />
                </Menu>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>{children}</Grid.Column>
                    </Grid.Row>
                </Grid>
            </body>
        </html>
    );
}
