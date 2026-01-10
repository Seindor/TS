import type { ISessionComponent } from "ReplicatedStorage/Interfaces/IComponents/ISessionComponent";
import { IProfileComponent } from "ReplicatedStorage/Interfaces/IComponents/IProfileComponent";
import { Registry } from "ReplicatedStorage/DI/Registry";
import { SessionTemplate } from "ReplicatedStorage/Templates/SessionTemplate";
import { Profile } from "@rbxts/profile-store";
import { IProfile } from "ReplicatedStorage/Interfaces/IComponents/IProfile";

export class PlayerComponent {
	public static Inject = [Registry.Scoped.SessionComponent, Registry.Scoped.ProfileComponent] as const;

	public Instance!: Player;
	public Id!: string;
	public Session!: SessionTemplate;
	public Profile!: Profile<IProfile>;

	private readonly profileComponent!: IProfileComponent;
	private readonly sessionComponent!: ISessionComponent;

	constructor(sessionComponent: ISessionComponent, profileComponent: IProfileComponent) {
		this.sessionComponent = sessionComponent;
		this.profileComponent = profileComponent;
	}

	public CreatePlayer(player: Player) {
		const { profile, replica } = this.profileComponent.LoadReplica(player);

		return {
			Instance: player,
			Id: tostring(player.UserId),
			Session: this.sessionComponent.LoadSession(player),
			Profile: profile,
			Replica: replica,
		};
	}
}
