import { ServerRegistry } from "ServerScriptService/DI/ServerRegistry";
import type { ISessionComponent } from "ServerStorage/ServerInterfaces/IComponents/ISessionComponent";
import type { SessionTemplate } from "ServerStorage/Templates/SessionTemplate";
import type {
	ICharacterDataComponent,
	ICharacterDataComponentMethods,
} from "ServerStorage/ServerInterfaces/IComponents/ICharacterDataComponent";

export class SessionComponent implements ISessionComponent {
	public static Inject = [
		ServerRegistry.Transient.SessionTemplate,
		ServerRegistry.Scoped.CharacterDataComponent,
	] as const;

	private Modules: {
		createSession: () => SessionTemplate;
		characterData: ICharacterDataComponent & ICharacterDataComponentMethods;
	};

	public Data: SessionTemplate;

	constructor(
		createSession: () => SessionTemplate,
		characterData: ICharacterDataComponent & ICharacterDataComponentMethods,
	) {
		this.Modules = {
			createSession: createSession,
			characterData: characterData,
		};
		this.Data = this.Modules.createSession();
	}

	public LoadSession(object: Player | Model): SessionTemplate {
		this.Data.CharacterData = this.Modules.characterData.Load(object);
		return this.Data;
	}
}
