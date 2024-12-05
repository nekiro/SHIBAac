import { Flex, Text, Image, HStack, useColorMode, Button, Spacer } from "@chakra-ui/react";
import { TopBarItem } from "./TopBarItem";
import { trpc } from "@util/trpc";
import Link from "@component/Link";
import { TopBarSeparator } from "./TopBarSeparator";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import TextInput from "@component/TextInput";
import DropdownButton from "@component/DropdownButton";
import { useRouter } from "next/router";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

export interface NavigationItems {
	text: string;
	href?: string;
	hasMenu?: boolean;
	menuItems?: { text: string; url: string }[];
}

const navigationItems: NavigationItems[] = [
	{ text: "News", href: "/" },
	{
		hasMenu: true,
		menuItems: [
			{ text: "Highscores", url: "/community/highscores" },
			// { text: "Guilds", url: "/community/guilds" },
			// { text: "Houses", url: "/community/houses" },
		],
		text: "Community",
	},
	{
		hasMenu: true,
		menuItems: [
			// { text: "Server Information", url: "/serverinfo" },
			{ text: "Downloads", url: "/downloads" },
		],
		text: "Library",
	},
	// { text: "Donate", href: "/donate" },
	// { text: "Store", href: "/shop" },
];

export const TopBar = () => {
	const user = trpc.me.me.useQuery().data;
	const status = trpc.status.status.useQuery().data;
	const router = useRouter();
	const { toggleColorMode, colorMode } = useColorMode();

	return (
		<Flex
			justifyContent="center"
			bgColor="blackAlpha.600"
			h="50px"
			paddingLeft="15px"
			paddingRight="15px"
			borderBottomWidth="1px"
			borderColor="violet.400"
		>
			<HStack>
				<Link href="/" style={{ height: "100%", textDecoration: "none" }}>
					<TopBarItem paddingLeft={0} userSelect="none" pointerEvents="none">
						<Image height="70%" src="/images/header.png" alt="shibaac" />
						<Text fontSize="lg" color="white" ml="10px">
							Shibaac
						</Text>
					</TopBarItem>
				</Link>
				<TopBarItem>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							const form = event.currentTarget;
							const searchValue = (form.elements.namedItem("search") as any)?.value;
							if (searchValue) {
								router.push(`/character/${searchValue}`);
								form.reset();
							}
						}}
					>
						<TextInput size="sm" name="search" placeholder="Search character" />
					</form>
				</TopBarItem>
				<Spacer w="2em" />
			</HStack>
			<HStack gap={0} height="50px">
				{navigationItems.map((item) => (
					<TopBarItem key={item.text} padding={0}>
						<DropdownButton text={item.text} hasMenu={item.hasMenu} list={item.menuItems} href={item.href} />
					</TopBarItem>
				))}
				<TopBarItem padding={0}>
					{user ? (
						<DropdownButton
							text={user.account?.name ?? "unknown"}
							hasMenu={true}
							list={[
								{ text: "Account Management", url: "/account" },
								{ text: "Sign out", url: "/account/logout" },
							]}
						/>
					) : (
						<DropdownButton
							text="Account"
							hasMenu={true}
							list={[
								{ text: "Login", url: "/account/login" },
								{ text: "Register", url: "/account/register" },
							]}
						/>
					)}
				</TopBarItem>
				<Spacer w="2em" />
			</HStack>

			<TopBarItem padding={0}>
				<HStack alignItems="center" gap="10px">
					{/* TODO: move to component */}
					<Button
						size="25px"
						title={colorMode === "light" ? "Dark mode" : "Light mode"}
						variant="ghost"
						padding={0}
						color="white"
						_hover={{ color: "violet.300" }}
						_active={{}}
						onClick={toggleColorMode}
					>
						{colorMode === "light" ? <MdOutlineDarkMode size="25px" /> : <MdDarkMode size="25px" />}
					</Button>
					<Link href={process.env.NEXT_PUBLIC_GITHUB_URL ?? ""} title="Github" isExternal color="white" _hover={{ color: "violet.300" }}>
						<FaGithub size="25px" />
					</Link>
					<Link href={process.env.NEXT_PUBLIC_DISCORD_URL ?? ""} title="Discord" isExternal color="white" _hover={{ color: "#5865F2" }}>
						<FaDiscord size="25px" />
					</Link>
					<Link href={process.env.NEXT_PUBLIC_YOUTUBE_URL ?? ""} title="Youtube" isExternal color="white" _hover={{ color: "red" }}>
						<TbBrandYoutubeFilled size="25px" />
					</Link>
				</HStack>
			</TopBarItem>
			<TopBarSeparator ml="10px" height="80%" alignSelf="center" />
			<Link href="/online">
				<TopBarItem paddingLeft="10px" flexDirection="row">
					<Text fontSize="sm" color="white">
						{status?.onlineCount ?? "..."} players online
					</Text>
				</TopBarItem>
			</Link>
		</Flex>
	);
};
