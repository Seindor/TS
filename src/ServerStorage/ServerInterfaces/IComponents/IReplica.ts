import { SessionTemplate } from "ServerStorage/Templates/SessionTemplate";
import { IProfile } from "./IProfile";
import { Profile } from "@rbxts/profile-store";

export interface IReplicaData {
	Profile: Profile<IProfile>;
	Session: SessionTemplate;
}
