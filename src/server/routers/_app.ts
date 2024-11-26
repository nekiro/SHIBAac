import { router } from "../trpc";
import { newsRouter } from "./news";
import { playerRouter } from "./player";
import { townRouter } from "./town";
import { communityRouter } from "./community";
import { statusRouter } from "./status";

export const appRouter = router({
	news: newsRouter,
	player: playerRouter,
	town: townRouter,
	community: communityRouter,
	status: statusRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
