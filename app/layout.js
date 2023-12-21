import "./globals.css";
import Image from "next/image";
import { headers } from 'next/headers'
import { Inter } from "next/font/google";
import { ChatBubbleLeftRightIcon, ArchiveBoxIcon, CloudArrowUpIcon, BellAlertIcon } from "@heroicons/react/24/outline";
import SearchInput from "./SearchInput";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";

const inter = Inter({ subsets: ["latin"] });

function get_header() {
	const headersL = headers();
	const JheadersList = {};
	headersL.forEach((v, k) => (JheadersList[k] = v));//迭代器->JSON
	return JheadersList
}

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

function MessageIcon({ Alert }) {
	if (Alert) {
		return <BellAlertIcon class="h-12 w-12 text-[#516e8b]" />
	} else {
		return <ArchiveBoxIcon className="h-12 w-12 text-[#516e8b]" />
	}
}

export default async function RootLayout({ children }) {
	const res = await fetch("http://localhost:8000/api/search/taglist", { headers: get_header() })
	const list = await res.json()
	return (
		<html lang="zh-hans">
			<body className={inter.className}>
				<div className="flex fixed  w-full bg-white h-16 top-0 items-center z-50 shadow-md">
					<a className="justify-self-start whitespace-nowrap flex items-center" href="/">
						<Image alt="logo" width={32} height={32} src="/logo.svg" className=" w-16 h-16" />
					</a>
					<div className="absolute left-1/4">
						<SearchInput suggestions={list.results} />
					</div>
					<div className=" absolute right-0 whitespace-nowrap flex items-center">
						<a className="img_b">
							<MessageIcon Alert={false}/>
							<div>消息</div>
						</a>
						<a className="img_b">
							<ChatBubbleLeftRightIcon className="h-12 w-12  text-[#516e8b]" />
							<div>论坛</div>
						</a>
						<a className="img_b" href="/post">
							<CloudArrowUpIcon className="h-12 w-12 text-[#516e8b]" />
							<div>上传</div>
						</a>
					</div>
				</div>
				<div className=" relative top-20">{children}</div>
			</body>
		</html>
	);
}
