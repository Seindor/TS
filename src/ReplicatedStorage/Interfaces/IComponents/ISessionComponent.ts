import type { SessionTemplate } from "ReplicatedStorage/Templates/SessionTemplate";

export interface ISessionComponent {
	LoadSession(object: Player | Model): SessionTemplate;
}
