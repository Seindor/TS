import type { SessionTemplate } from "ReplicatedStorage/SharedTemplates/SessionTemplate";

export interface ISessionComponent {
	LoadSession(object: Player | Model): SessionTemplate;
}
