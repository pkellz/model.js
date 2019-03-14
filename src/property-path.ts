import { Type, PropertyType } from "./type";
import { Format } from "./format";
import { Event, EventObject, EventSubscriber } from "./events";
import { Entity } from "./entity";

export interface PropertyPath {

	readonly containingType: Type;
	readonly name: string;
	readonly propertyType: PropertyType;
	readonly isList: boolean;
	readonly isStatic: boolean;

	label: string;
	helptext: string;
	isCalculated: boolean;
    format: Format<any>;

    readonly changed: EventSubscriber<Entity, PropertyChangeEventArgs>;
	readonly accessed: EventSubscriber<Entity, PropertyAccessEventArgs>;
}

export interface PropertyAccessEventHandler {
    (this: Entity, args: EventObject & PropertyAccessEventArgs): void;
}

export interface PropertyAccessEventArgs {
	entity: Entity;
	property: PropertyPath;
	value: any;
}

export interface PropertyChangeEventHandler {
    (this: Entity, args: EventObject & PropertyChangeEventArgs): void;
}

export interface PropertyChangeEventArgs {
	entity: Entity;
	property: PropertyPath;
	newValue: any,
	oldValue?: any,
}