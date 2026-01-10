type AnyObject = object;

const Tasks = new Map<AnyObject, Map<string, thread>>();

const Threads = new Map<AnyObject, Map<string, RBXScriptConnection>>();

export class TaskManager {
	public static CreateTask(Object: AnyObject, TaskName: string, Time: number | undefined, Func: () => void) {
		let objectTasks = Tasks.get(Object);
		if (!objectTasks) {
			objectTasks = new Map<string, thread>();
			Tasks.set(Object, objectTasks);
		}

		if (objectTasks.has(TaskName)) {
			TaskManager.CancelTask(Object, TaskName);
			warn(`Task: ${TaskName} is Recreated for.`);
		}

		let t: thread;
		if (Time === undefined || Time <= 0) {
			t = task.spawn(Func);
		} else {
			t = task.delay(Time, Func);
		}

		objectTasks.set(TaskName, t);
	}

	public static CancelAllTasks(Object: AnyObject) {
		const objectTasks = Tasks.get(Object);
		if (!objectTasks) return;

		for (const [taskName] of objectTasks) {
			TaskManager.CancelTask(Object, taskName);
		}
	}

	public static CancelTask(Object: AnyObject, TaskName: string) {
		let objectTasks = Tasks.get(Object);
		if (!objectTasks) {
			objectTasks = new Map<string, thread>();
			Tasks.set(Object, objectTasks);
		}

		const t = objectTasks.get(TaskName);
		if (t !== undefined) {
			task.cancel(t);
			objectTasks.delete(TaskName);
		}
	}

	public static CreateThread(Object: AnyObject, ThreadName: string, Conn: RBXScriptConnection) {
		let objectThreads = Threads.get(Object);
		if (!objectThreads) {
			objectThreads = new Map<string, RBXScriptConnection>();
			Threads.set(Object, objectThreads);
		}

		if (objectThreads.has(ThreadName)) {
			TaskManager.CancelThread(Object, ThreadName);
		}

		objectThreads.set(ThreadName, Conn);
	}

	public static CancelAllThreads(Object: AnyObject) {
		const objectThreads = Threads.get(Object);
		if (!objectThreads) return;

		for (const [threadName] of objectThreads) {
			TaskManager.CancelThread(Object, threadName);
		}
	}

	public static CancelThread(Object: AnyObject, ThreadName: string) {
		const objectThreads = Threads.get(Object);
		if (!objectThreads) return;

		const conn = objectThreads.get(ThreadName);
		if (!conn) return;

		conn.Disconnect();
		objectThreads.delete(ThreadName);
	}
}

export default TaskManager;
