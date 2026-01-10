import { IProfile } from "./IProfile";

export interface IReplica {
	Data: IProfile;
	Tags: { UserId: number };
}
