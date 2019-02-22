import { Entity, isEntityType, Type } from ".";
import { Property } from "./property";

export interface PropertySerializationResult {
	key: string;
	value: any;
}

/**
 * Allows additional key/value pairs to be introduced to serialization output.
 * Note: duplicate keys will favor model properties.
 */
export interface PropertyInjector {
	inject(entity: Entity): PropertySerializationResult[];
}

/**
 * Allows transformation of the serialized name and value of a model property.
 */
export interface PropertyConverter {
	shouldConvert(prop: Property): boolean;
	/**
	 * Return null to prevent serialization of the property.
	 * @param prop The current property being serialized.
	 * @param value The value of the property on the entity currently being serialized.
	 */
	convert(prop: Property, value: any): PropertySerializationResult;
}

export class EntitySerializer {
	private _propertyConverters: PropertyConverter[] = [];
	private _propertyInjectors = new Map<Type, PropertyInjector[]>();

	/**
	 * Property converters should be registered in order of increasing specificity.
	 * If two converters would convert a property, only the one registered last will apply.
	 */
	registerPropertyConverter(converter: PropertyConverter) {
		this._propertyConverters.unshift(converter);
	}

	registerPropertyInjector(type: Type, injector: PropertyInjector) {
		let injectors = this._propertyInjectors.get(type) || [];
		injectors.push(injector);
		this._propertyInjectors.set(type, injectors);
	}

	private getPropertyInjectors(type: Type): PropertyInjector[] {
		let injectors = [];
		do {
			if (this._propertyInjectors.has(type))
				injectors.push(...this._propertyInjectors.get(type));
			type = type.baseType;
		} while (type);
		return injectors;
	}

	/**
	 * Produces a JSON-valid object representation of the entity.
	 * @param entity
	 */
	serialize(entity: Entity, serializeNull: boolean = false): Object {
		let result: Object = {};
		const type = entity.meta.type;
		type.properties
			.filter(p => !p.isCalculated && !p.isStatic)
			.map(prop => {
				let value = prop.value(entity);
				let converter = this._propertyConverters.find(c => c.shouldConvert(prop));
				if (converter)
					return converter.convert(prop, value);
				return EntitySerializer.defaultPropertyConverter(prop, value);
			})
			.concat(this.getPropertyInjectors(type).flatMap(i => i.inject(entity)))
			.forEach(pair => {
				// Once a key has been serialized, it cannot be overwritten
				if (pair && !result.hasOwnProperty(pair.key) && (serializeNull || pair.value !== null))
					result[pair.key] = pair.value;
			});
		return result;
	}

	private static defaultPropertyConverter(prop: Property, value: any): PropertySerializationResult {
		let result = { key: prop.name, value };
		if (value && isEntityType(prop.propertyType)) {
			result.value = value.serialize();
		}
		return result;
	}
}