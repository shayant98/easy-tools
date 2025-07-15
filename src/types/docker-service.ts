export interface DockerService {
	id: string;
	name: string;
	image: string;
	container_name: string;
	volumes: { id: string; internal: string; external: string }[];
	ports: { id: string; internal: string; external: string }[];
	env: { id: string; label: string; value: string }[];
	labels: { id: string; label: string; value: string }[];
}

export type ObtainKeys<Obj, Type> = {
	[Prop in keyof Obj]: Obj[Prop] extends Type ? Prop : never;
}[keyof Obj];

export type GetStringKeys = ObtainKeys<DockerService, string>; //  "string1" | "string2"
