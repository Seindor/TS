import { Profile } from "@rbxts/profile-store";
import type { SessionTemplate } from "ReplicatedStorage/Templates/SessionTemplate";
import { IProfile } from "./IProfile";
import { IReplica } from "./IReplica";

export interface IPlayerComponent {
	Instance: Player;
	Id: string;
	Session: SessionTemplate;
	Profile: Profile<IProfile>;
	Replica: IReplica;
}

export interface IPlayerComponentMethods {
	CreatePlayer(Player: Player): IPlayerComponent;
}
