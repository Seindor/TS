import type { ISessionComponent } from "ServerScriptService/ServerInterfaces/IComponents/ISessionComponent";
import { IProfileComponent } from "ServerScriptService/ServerInterfaces/IComponents/IProfileComponent";
import { ServerRegistry } from "ServerScriptService/DI/ServerRegistry";
import { SessionTemplate } from "ServerStorage/Templates/SessionTemplate";
import { Profile } from "@rbxts/profile-store";
import { IProfile } from "ServerScriptService/ServerInterfaces/IComponents/IProfile";
import { Replica } from "@rbxts/mad-replica";

export class PlayerComponent {
	public static Inject = [ServerRegistry.Scoped.ProfileComponent] as const;

	public Modules!: {
		profileComponent: IProfileComponent;
	};

	public Data!: {
		Instance: Player;
		Id: string;
		Session: SessionTemplate;
		Profile: Profile<IProfile>;
		Replica: Replica;
	};

	constructor(profileComponent: IProfileComponent) {
		this.Modules = {
			profileComponent: profileComponent,
		};
	}

	public CreatePlayer(player: Player) {
		const { replica } = this.Modules.profileComponent.LoadReplica(player);

		this.Data = {
			Instance: player,
			Id: tostring(player.UserId),
			Session: replica.Data.Session,
			Profile: replica.Data.Profile,
			Replica: replica,
		};

		return this.Data;
	}
}
