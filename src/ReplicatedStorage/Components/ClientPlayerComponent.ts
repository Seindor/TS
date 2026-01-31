import { SharedRegistry } from "ReplicatedStorage/DI/SharedRegistry";
import { Replica, ReplicaClient } from "@rbxts/mad-replica";

import { TokenType } from "ReplicatedStorage/DI/Token";

export class ClientPlayerComponent {
	public static Inject = [SharedRegistry.Scoped.Components.SessionComponent] as const;

	public Modules!: {
		sessionComponent: TokenType<typeof SharedRegistry.Scoped.Components.SessionComponent>;
	};

	public Data!: {
		Instance: Player;
		Id: string;
		Session: ReturnType<TokenType<typeof SharedRegistry.Scoped.Templates.SessionTemplate>>;
		Replica?: Replica;
	};

	constructor(sessionComponent: TokenType<typeof SharedRegistry.Scoped.Components.SessionComponent>) {
		this.Modules = {
			sessionComponent,
		};
	}

	public CreateClientPlayer(player: Player) {
		if (this.Data) {
			return this.Data;
		}

		this.Data = {
			Instance: player,
			Id: tostring(player.UserId),
			Session: this.Modules.sessionComponent!.LoadSession(player),
		};
		this.CreateReplica(this.Data);
		return this.Data;
	}

	private CreateReplica(_Player: this["Data"]) {
		ReplicaClient.OnNew("Main", function (replica) {
			_Player.Replica = replica;
			_Player.Session.Settings.ReplicaLoaded = true;
		});

		ReplicaClient.RequestData();
	}
}
