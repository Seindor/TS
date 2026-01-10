export type Token<T = unknown> = {
	readonly __brand: "DI_TOKEN";
	readonly name: string;
	readonly __type?: T;
};

export function createToken<T>(name: string): Token<T> {
	return { __brand: "DI_TOKEN", name } as Token<T>;
}
