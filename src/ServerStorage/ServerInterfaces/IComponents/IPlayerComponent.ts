import { Profile } from "@rbxts/profile-store";
import type { SessionTemplate } from "ReplicatedStorage/SharedTemplates/SessionTemplate";
import { IProfile } from "ReplicatedStorage/SharedInterfaces/IComponents/IProfile";
import { Replica } from "@rbxts/mad-replica";

export interface IPlayerComponent {
	Instance: Player;
	Id: string;
	Session: SessionTemplate;
	Profile: Profile<IProfile>;
	Replica: Replica;
}

export interface IPlayerComponentMethods {
	CreatePlayer(Player: Player): IPlayerComponent;
}
