import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";
import SideNavbar from "@/components/sideNavbar";
import Nav from "@/components/navbar";
export const metadata: Metadata = {
	title: {
		default: 'Dashboard',
		template: `%s - Dashboard`,
	},
	description: 'Dashboard',
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col md:flex-row min-h-screen">
						<SideNavbar />
						<main className="w-full">
							<Nav />
							<div className="p-4 max-w-5xl mx-auto">{children}</div>
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
