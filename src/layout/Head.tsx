import React from "react";
import NextHead from "next/head";
import { NextSeo } from "next-seo";

export interface HeadProps {
	title?: string;
	description?: string;
}

const Head = ({ title, description = "Automatic Account Creator" }: HeadProps) => {
	return (
		<>
			<NextHead>
				<meta charSet="UTF-8" key="charset" />
				<meta name="viewport" content="width=device-width,initial-scale=1" key="viewport" />
				<meta property="og:image" content="/favicon.ico" />
				<link rel="icon" href="/favicon.ico" key="favicon" />
			</NextHead>
			<NextSeo
				title={`${process.env.NEXT_PUBLIC_SERVER_NAME} - ${title}`}
				description={description}
				//anonical={properties.canonical}
				openGraph={{
					title: title,
					description: description,
					//url: properties.canonical,
					locale: "en",
					site_name: "shibaac",
				}}
			/>
		</>
	);
};

export default Head;
