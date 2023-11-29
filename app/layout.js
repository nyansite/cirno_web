import Image from "next/image";
import SearchInput from "./SearchInput";
import "./globals.css";
import { Inter } from "next/font/google";
import { ChatBubbleLeftEllipsisIcon,ArchiveBoxIcon,CloudArrowUpIcon   } from '@heroicons/react/24/solid';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="zh-hans">
			<body className={inter.className}>
				<div className="flex fixed w-full bg-white h-16 top-0 items-center">
					<a className="justify-self-start whitespace-nowrap flex items-center" href="/">
						<img src="/logo.svg" className=" w-16 h-16" />
					</a>
					<div className="absolute left-1/4">
						<SearchInput />
					</div>
					<div className=" absolute right-0 whitespace-nowrap flex items-center">
						<a className="img_b">
							<ArchiveBoxIcon class="h-12 w-12 stroke-[#516e8b] text-transparent" />
							<div>消息</div>
						</a>
						<a className="img_b">
							<ChatBubbleLeftEllipsisIcon class="h-12 w-12 stroke-[#516e8b] text-transparent" />
							<div>论坛</div>
						</a>
						<a className="img_b">
							<CloudArrowUpIcon  class="h-12 w-12 stroke-[#516e8b] text-transparent" />
							<div>消息</div>
						</a>
					</div>
				</div>
				<div className="w-full h-16"></div>
				{children}
			</body>
		</html>
	);
}
