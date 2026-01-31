import { CompositionRootShared } from "ReplicatedStorage/DI/CompositionRoot_Shared";
import { SharedRegistry } from "ReplicatedStorage/DI/SharedRegistry";

const SharedScope = CompositionRootShared.createScope();

const AbilitySystem = SharedScope.resolve(SharedRegistry.Singleton.Systems.AbilitySystem);

export function AbilityInit() {
	print(AbilitySystem);
	const Ability = AbilitySystem.CreateAbility();

	Ability.Config.Name = "Test";
	Ability.RunTime.Cooldown = 1;
	Ability.Config.Duration = 1;
	Ability.Config.MinDuration = Ability.Config.Duration;

	AbilitySystem.ChangeKey(Ability, Enum.KeyCode.Z);

	Ability.Functions.OnStart = () => {
		AbilitySystem.CheckBlacklist(Ability, ["Stun"]);
		print("Test Ability OnStart");
		Ability.Functions.OnCommit();
	};

	Ability.Functions.OnCommit = () => {
		print("Test Ability OnCommit");
	};

	Ability.Functions.OnEnd = () => {
		print("Test Ability OnEnd");
	};

	return Ability;
}
