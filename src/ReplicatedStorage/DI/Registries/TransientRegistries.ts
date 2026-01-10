import { createToken } from "ReplicatedStorage/DI/Token";

import type { SessionTemplate } from "ReplicatedStorage/Templates/SessionTemplate";

export const TransientRegistries = {
	DamageCalculator: createToken("DamageCalculator"),
	SessionFactory: createToken<() => SessionTemplate>("SessionFactory"),
} as const;
