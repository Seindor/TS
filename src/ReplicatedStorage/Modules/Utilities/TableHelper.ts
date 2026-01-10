type Key = string | number;
type Dict = Record<Key, unknown>;

function isTable(v: unknown): v is Dict {
	return typeIs(v, "table");
}

export class TableHelper {
	static loadModules<T>(modules: ModuleScript[]): Record<string, T> {
		const out: Record<string, T> = {};
		for (const m of modules) {
			out[m.Name] = require(m) as T;
		}
		return out;
	}

	static count(t?: Dict): number {
		if (!t) return 0;
		let c = 0;
		for (const [i] of pairs(t)) c++;
		return c;
	}

	static deepClone<T>(value: T, seen = new Map<unknown, unknown>()): T {
		if (!isTable(value)) return value;

		const cached = seen.get(value);
		if (cached !== undefined) return cached as T;

		const out: Dict = {};
		seen.set(value, out);

		for (const [k, v] of pairs(value as Dict)) {
			out[k as Key] = this.deepClone(v, seen);
		}

		return out as unknown as T;
	}

	static deepFillMissing<T>(target: T, template: T, seen = new Map<unknown, true>()): T {
		if (!isTable(target) || !isTable(template)) return target;

		if (seen.get(target) !== undefined) return target;
		seen.set(target, true);

		for (const [k, tv] of pairs(template as Dict)) {
			const key = k as Key;
			const cur = (target as Dict)[key];

			if (cur === undefined) {
				(target as Dict)[key] = this.deepClone(tv);
			} else if (isTable(cur) && isTable(tv)) {
				this.deepFillMissing(cur, tv, seen);
			}
		}

		return target;
	}

	static deepFind(
		root: unknown,
		targetKeyOrValue: unknown,
		typeName?: string,
		visited = new Set<unknown>(),
	): unknown {
		if (!isTable(root)) return undefined;
		if (visited.has(root)) return undefined;
		visited.add(root);

		for (const [k, v] of pairs(root)) {
			if (k === (targetKeyOrValue as never)) {
				if (!typeName || typeOf(v) === typeName) return v;
			}

			if (v === targetKeyOrValue) {
				if (!typeName || typeOf(v) === typeName) return v;
			}

			if (isTable(v)) {
				const found = this.deepFind(v, targetKeyOrValue, typeName, visited);
				if (found !== undefined) return found;
			}
		}

		return undefined;
	}
}

export default TableHelper;
