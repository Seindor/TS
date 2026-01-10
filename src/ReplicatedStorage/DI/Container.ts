import type { Token } from "ReplicatedStorage/DI/Token";

type Factory<T> = (scope: Scope) => T;
type Lifetime = "Singleton" | "Scoped" | "Transient";

type Binding<T = unknown> = {
	lifetime: Lifetime;
	factory: Factory<T>;
};

export type InjectableClass<T> = {
	new (...args: never[]): T;
	Inject?: readonly Token[];
};

export class Container {
	private bindings = new Map<Token, Binding>();
	private singletons = new Map<Token, unknown>();

	public createClassFactory<T>(cls: InjectableClass<T>) {
		return (scope: Scope) => scope.instantiate(cls);
	}

	public bindSingleton<T>(token: Token<T>, factory: Factory<T>) {
		this.bindings.set(token, { lifetime: "Singleton", factory });
	}

	public bindScoped<T>(token: Token<T>, factory: Factory<T>) {
		this.bindings.set(token, { lifetime: "Scoped", factory });
	}

	public bindTransient<T>(token: Token<T>, factory: Factory<T>) {
		this.bindings.set(token, { lifetime: "Transient", factory });
	}

	public createScope(): Scope {
		return new Scope(this);
	}

	public _getBinding(token: Token) {
		return this.bindings.get(token);
	}
	public _getSingleton(token: Token) {
		return this.singletons.get(token);
	}
	public _setSingleton(token: Token, value: unknown) {
		this.singletons.set(token, value);
	}
}

export class Scope {
	private scoped = new Map<Token, unknown>();

	constructor(private root: Container) {}

	public resolve<T>(token: Token<T>): T {
		const binding = this.root._getBinding(token);
		if (!binding) error(`DI: token not bound: ${token.name}`);

		if (binding.lifetime === "Singleton") {
			const cached = this.root._getSingleton(token);
			if (cached !== undefined) return cached as T;

			const created = binding.factory(this);
			this.root._setSingleton(token, created);
			return created as T;
		}

		if (binding.lifetime === "Scoped") {
			const cached = this.scoped.get(token);
			if (cached !== undefined) return cached as T;

			const created = binding.factory(this);
			this.scoped.set(token, created);
			return created as T;
		}

		return binding.factory(this) as T;
	}

	public instantiate<T>(Class: InjectableClass<T>, manualArg?: unknown): T {
		const inject = Class.Inject ?? [];
		const deps = inject.map((t) => this.resolve(t));

		const Ctor = Class as unknown as new (...args: unknown[]) => T;

		if (manualArg === undefined) {
			return new Ctor(...deps);
		}

		return new Ctor(manualArg, ...deps);
	}
}
