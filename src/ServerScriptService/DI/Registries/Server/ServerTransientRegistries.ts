import { createToken } from "ReplicatedStorage/DI/Token";

import type { SessionTemplate } from "ServerStorage/Templates/SessionTemplate";

export const ServerTransientRegistries = {
	SessionTemplate: createToken<() => SessionTemplate>("SessionTemplate"),
} as const;
