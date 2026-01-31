import { TokenType } from "ReplicatedStorage/DI/Token";
import { SharedRegistry } from "ReplicatedStorage/DI/SharedRegistry";
import { ServerRegistry } from "ServerScriptService/DI/ServerRegistry";

import { Profile } from "@rbxts/profile-store";
import { Replica } from "@rbxts/mad-replica";

export class PlayerComponent {
	public static Inject = [ServerRegistry.Scoped.Components.ProfileComponent] as const;

	public Modules!: {
		profileComponent: TokenType<typeof ServerRegistry.Scoped.Components.ProfileComponent>;
	};

	public Data!: {
		Instance: Player;
		Id: string;
		Session: ReturnType<TokenType<typeof SharedRegistry.Scoped.Templates.SessionTemplate>>;
		Profile: ReturnType<
			NonNullable<TokenType<typeof ServerRegistry.Scoped.Components.ProfileComponent>>["LoadProfile"]
		>;

		Replica: Replica;
	};

	constructor(profileComponent: TokenType<typeof ServerRegistry.Scoped.Components.ProfileComponent>) {
		this.Modules = {
			profileComponent,
		};
	}

	public CreatePlayer(player: Player) {
		const replica = this.Modules.profileComponent!.LoadReplica(player);

		this.Data = {
			Instance: player,
			Id: tostring(player.UserId),
			Session: replica.Data.Session,
			Profile: this.Modules.profileComponent!.LoadProfile(player),
			Replica: replica,
		};

		this.Data.Session.Settings.ReplicaLoaded = true;

		return this.Data;
	}
}
