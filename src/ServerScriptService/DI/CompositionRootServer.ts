import { Container } from "ReplicatedStorage/DI/Container";
import { ComponentsComposition } from "ServerScriptService/DI/Compositions/ComponentsComposition";
import { SingletonComposition } from "./Compositions/SignletonComposition";

export const CompositionRootServer = new Container();

ComponentsComposition(CompositionRootServer);
SingletonComposition(CompositionRootServer);
