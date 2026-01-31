import { Container } from "ReplicatedStorage/DI/Container";

import { Shared_SingletonComposition } from "ReplicatedStorage/DI/Compositions/Shared/Shared_SingletonComposition";
import { Shared_ScopedComposition } from "ReplicatedStorage/DI/Compositions/Shared/Shared_ScopedComposition";
import { Shared_TransientComposition } from "ReplicatedStorage/DI/Compositions/Shared/Shared_TransientComposition";

export const CompositionRootShared = new Container();

Shared_SingletonComposition(CompositionRootShared);
Shared_ScopedComposition(CompositionRootShared);
Shared_TransientComposition(CompositionRootShared);
