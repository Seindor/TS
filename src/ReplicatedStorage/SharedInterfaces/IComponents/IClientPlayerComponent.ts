import type { SessionTemplate } from "ReplicatedStorage/SharedTemplates/SessionTemplate";
import { Replica } from "@rbxts/mad-replica";

export interface IClientPlayerComponent {
	Instance: Player;
	Id: string;
	Session: SessionTemplate;
	Replica?: Replica | undefined;
}

export interface IClientPlayerComponentMethods {
	CreateClientPlayer(Player: Player): IClientPlayerComponent;
}
