import { SharedRegistry } from "ReplicatedStorage/DI/SharedRegistry";
import { TokenType } from "ReplicatedStorage/DI/Token";

export class AbilitySystem {
	public static Inject = [SharedRegistry.Scoped.Templates.AbilityTemplate] as const;

	private Modules: {
		createAbilityTemplate: TokenType<typeof SharedRegistry.Scoped.Templates.AbilityTemplate>;
	};

	constructor(createAbilityTemplate: typeof this.Modules.createAbilityTemplate) {
		this.Modules = { createAbilityTemplate };
	}

	public CreateAbility() {
		const Ability = setmetatable(this.Modules.createAbilityTemplate!(), {
			__index: (_t, key: unknown) => (AbilitySystem as unknown as Record<string, unknown>)[key as string],
		});
		return Ability;
	}

	public ChangeKey(
		Ability: ReturnType<typeof this.Modules.createAbilityTemplate>,
		Key: Enum.KeyCode | Enum.UserInputType,
	) {
		Ability.Config.Key = Key;
		return Key;
	}

	public SetOwner(Ability: ReturnType<typeof this.Modules.createAbilityTemplate>, Owner: undefined) {
		Ability.RunTime.Owner = Owner;
		return Owner;
	}

	public CheckBlacklist(Ability: ReturnType<typeof this.Modules.createAbilityTemplate>, Whitelist: []) {
		const Owner = Ability.RunTime.Owner;
		print(Owner, Whitelist);
		return true;
	}
}
