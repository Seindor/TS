import { SharedRegistry } from "ReplicatedStorage/DI/SharedRegistry";

import { TokenType } from "ReplicatedStorage/DI/Token";

export class CharacterDataComponent {
	public static Inject = [
		SharedRegistry.Singleton.Utilities.EventBus,
		SharedRegistry.Singleton.Utilities.TaskManager,
	] as const;

	public Data: {
		Character?: Model;
		HumanoidRootPart?: BasePart;
		Humanoid?: Humanoid;
		Animator?: Animator;
	};

	private Modules: {
		bus: TokenType<typeof SharedRegistry.Singleton.Utilities.EventBus>;
		TaskManager: TokenType<typeof SharedRegistry.Singleton.Utilities.TaskManager>;
	};

	constructor(
		bus: TokenType<typeof SharedRegistry.Singleton.Utilities.EventBus>,
		taskManager: TokenType<typeof SharedRegistry.Singleton.Utilities.TaskManager>,
	) {
		this.Modules = { bus: bus, TaskManager: taskManager };
		this.Data = {
			Character: undefined,
			HumanoidRootPart: undefined,
			Humanoid: undefined,
			Animator: undefined,
		};
	}

	public Load(Object: Player | Model) {
		if (Object.IsA("Player")) {
			this.Track(Object);
		} else {
			this.LoadCharacterData(Object);
		}
		return this.Data;
	}

	private Track(Player: Player): void {
		if (Player.Character) {
			this.LoadCharacterData(Player.Character);
		}

		this.Modules.TaskManager!.CreateThread(
			Player,
			"CharacterTrack",
			Player.CharacterAdded.Connect((Character: Model) => {
				this.LoadCharacterData(Character);
			}),
		);
	}

	private LoadCharacterData(Character: Model): void {
		this.Data.Character = Character;
		this.Data.HumanoidRootPart =
			(Character.FindFirstChild("HumanoidRootPart") as BasePart) || (Character.PrimaryPart as BasePart);
		this.Data.Humanoid =
			Character.FindFirstChildOfClass("Humanoid") || (Character.WaitForChild("Humanoid") as Humanoid);
		this.Data.Animator = this.Data.Humanoid?.FindFirstChildOfClass("Animator");
	}

	public Destroy(Object: Player | Model): void {
		this.Modules.TaskManager!.CancelThread(Object, "CharacterTrack");
	}
}
