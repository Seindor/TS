import { SessionTemplate } from "ReplicatedStorage/SharedTemplates/SessionTemplate";
import { IProfile } from "./IProfile";
import { Profile } from "@rbxts/profile-store";

export interface IReplicaData {
	Profile: IProfile;
	Session: SessionTemplate;
}
