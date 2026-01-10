import { Registry } from "ReplicatedStorage/DI/Registry";
import type { ISessionComponent } from "ReplicatedStorage/Interfaces/IComponents/ISessionComponent";
import type { SessionTemplate } from "ReplicatedStorage/Templates/SessionTemplate";
import type {
	ICharacterDataComponent,
	ICharacterDataComponentMethods,
} from "ReplicatedStorage/Interfaces/IComponents/ICharacterDataComponent";

export class SessionComponent implements ISessionComponent {
	public static Inject = [Registry.Transient.SessionFactory, Registry.Scoped.CharacterDataComponent] as const;

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
