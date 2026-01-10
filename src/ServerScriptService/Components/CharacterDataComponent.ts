import TaskManager from "ReplicatedStorage/Modules/Utilities/TaskManager";
import { Registry } from "ReplicatedStorage/DI/Registry";
import EventBus from "ReplicatedStorage/Modules/Utilities/EventBus";
import { Players } from "@rbxts/services";

export class CharacterDataComponent {
	public static Inject = [Registry.Singleton.EventBus] as const;

	public Data: {
		Character?: Model;
		HumanoidRootPart?: BasePart;
		Humanoid?: Humanoid;
		Animator?: Animator;
	};

	private Modules: {
		bus: EventBus;
	};

	constructor(bus: EventBus) {
		this.Modules = { bus: bus };
		this.Data = {};
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

		TaskManager.CreateThread(
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
		this.Data.Humanoid = Character.FindFirstChildOfClass("Humanoid");
		this.Data.Animator = this.Data.Humanoid?.FindFirstChildOfClass("Animator");

		if (Players.GetPlayerFromCharacter(Character)) {
			this.Modules.bus.Fire(
				"Signals.SendToClient",
				undefined,
				Players.GetPlayerFromCharacter(Character),
				"Character.CharacterAdded",
			);
		}
	}

	public Destroy(Object: Player | Model): void {
		TaskManager.CancelThread(Object, "CharacterTrack");
	}
}
