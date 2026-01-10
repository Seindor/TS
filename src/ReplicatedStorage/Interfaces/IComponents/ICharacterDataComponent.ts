export interface ICharacterDataComponentMethods {
	Load(object: Player | Model): ICharacterDataComponent;
	Destroy(object: Player | Model): void;
}

export interface ICharacterDataComponentData {
	Data: {
		Character?: Model;
		Humanoid?: Humanoid;
		HumanoidRootPart?: BasePart;
		Animator?: Animator;
	};
}

export interface ICharacterDataComponent {
	Character?: Model;
	Humanoid?: Humanoid;
	HumanoidRootPart?: BasePart;
	Animator?: Animator;
}
