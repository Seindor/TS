import { SharedRegistry } from "ReplicatedStorage/DI/SharedRegistry";
import { TokenType } from "ReplicatedStorage/DI/Token";

export class SessionComponent {
	public static Inject = [
		SharedRegistry.Scoped.Templates.SessionTemplate,
		SharedRegistry.Scoped.Components.CharacterDataComponent,
	] as const;

	private Modules: {
		createSession: TokenType<typeof SharedRegistry.Scoped.Templates.SessionTemplate>;
		characterData: TokenType<typeof SharedRegistry.Scoped.Components.CharacterDataComponent>;
	};

	public Data: ReturnType<typeof this.Modules.createSession>;

	constructor(
		createSession: TokenType<typeof SharedRegistry.Scoped.Templates.SessionTemplate>,
		characterData: TokenType<typeof SharedRegistry.Scoped.Components.CharacterDataComponent>,
	) {
		this.Modules = {
			createSession,
			characterData,
		};
		this.Data = this.Modules.createSession!();
	}

	public LoadSession(object: Player | Model): ReturnType<typeof this.Modules.createSession> {
		this.Data.CharacterData = this.Modules.characterData!.Load(object);
		return this.Data;
	}
}
