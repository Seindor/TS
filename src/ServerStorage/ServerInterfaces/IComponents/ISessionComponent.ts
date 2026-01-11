import type { SessionTemplate } from "ServerStorage/Templates/SessionTemplate";

export interface ISessionComponent {
	LoadSession(object: Player | Model): SessionTemplate;
}
