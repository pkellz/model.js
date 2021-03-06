# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [0.8.8] - 2020-12-21
### Added
- ability to prevent property set if value would violate AllowedValuesRule

## [0.8.7] - 2020-12-11
### Changed
- refactored internal EventScope concept to avoid runaway rules
## [0.8.6] - 2020-11-17
### Fixed
- return null when calling formatNumber with null (#41)

## [0.8.5] - 2020-10-29
### Fixed
- Simplify 'normalize' and make it no longer tied to a particular time zone (#39)

## [0.8.4] - 2020-10-01
### Fixed
- reference properties with tokenized formats not being formatted correctly (#35)
### Added
- Handle validation rule messages that are non-string (#38)

## [0.8.3] - 2020-09-17
### Fixed
- Fix for initialization of calculated lists (#33)

## [0.8.2] - 2020-09-11
### Fixed
- incorrect initialization of calculations due to timing issues during entity construction
- stack overflow when initializing calculated list properties
### Changed
- Change the `normalize` function to accept a format string

## [0.8.1] - 2020-08-14
### Fixed
- prevent reentrant calls to Entity.updateWithContext for the same entity with the same context (avoids infinite recursion)
- short circuit processing of waiting queue on InitializationContext if a waiting callback queues a new task on the context
### Changed
- improve logic for updating entity lists to update items in place when possible
- `Entity.withContext` renamed to `updateWithContext` to serve the specific purpose of calling `set()` instead of a general callback

## [0.8.0] - 2020-08-07
### Changed
- provide source rule/format when creating conditions

## [0.7.2] - 2020-08-05
### Fixed
- ignore calculated/constant properties when calling entity set/init
- null ref error in date/number format functions
- remove references to remove/removeAt functions

## [0.7.1] - 2020-06-23
### Added
- Asynchronous value resolution when calling Type.create for preexisting entity
### Fixed
- Bug with nested async value resolutions during createOrUpdate (#21)
- Problems with modifying/replacing list item logic when calling Entity.set()

## [0.7.0] - 2020-06-17
### Added
- Add option to override source of dynamic property label (#19) (506b29b)

## [0.6.3] - 2020-06-11
### Fixed
- Inconsistencies with existing vs new entity initialization (#17) (c3942c8)
- Catch exceptions in validation rule assert/message functions (#18) (622ac69)

## [0.6.2] - 2020-06-02
### Added
- Add support for resource names as StringFormatRule message
### Fixed
- Do not choose "between" error message if RangeRule min or max is null
- Normalize Date and Time values before making RangeRule comparisons

## [0.6.1] - 2019-12-05
### Fixed
- Fix regression in call to entity constructor from deserialize

## [0.6.0] - 2019-12-05
### Changed
- Rename `id` in property options to `identifier`
- Get rid of `Property.fieldName` and `Model.fieldNamePrefix` and use `Entity.__fields__` and `Property.name` instead
- Various changes to private backing fields: `Entity.__pendingInit__`, `ObjectMeta.__pendingInvocation__`, `Type.__pool__`, `Type.__known__`, `Type._lastId`, `Type.__properties__`, `Type._formats`, `Type._chains`, `Model._formats`, `Model._ready`
### Fixed
- Fix special-casing of "Id" property and look at `Type.identifier` instead
- Update `derivedTypes` when a type is created from a base type
- Cache value type formats using the constructor name (ex: "String") instead of its string representation

## [0.5.0] - 2019-12-04
### Changed
- Add `Property.isIdentifier`, set via `id` boolean option instead of detecting a property named "Id"

## [0.4.0] - 2019-11-27
### Added
- If the 'Id' property is changed, then change the object's id and re-pool with the new id
- Add new `Type.createSync()` method as an equivalent to `Type.create()` that is not asynchronous
- In `Type.create()`, if the state has an `Id` field then use it to fetch or create an object
### Fixed
- Ensure that a property is always either updated or changed for any state data pased to `set()` that matches a property name
- Use existing state if deserialize returns undefined (i.e. no serializer handled it)
- Throw an error when attempting to change the id of an object to one that is already pooled
### Changed
- If state passed to `set()` is an object with an Id property, then fetch or create an object with that Id
- Don't remove an old id from the pool when an object's id is changed (identifier should be permanent)
### Removed
- Get rid of legacy pool and legacy id (not needed)
- Get rid of unregister method and events (not used so no scenario exists for testing)
- Get rid of destroy method and events (not used so no scenario exists for testing)

## [0.3.5] - 2019-11-22
### Added
- Add support for type-level rule/method

## [0.3.4] - 2019-11-21
### Fixed
- Allow properties of type 'Object'

## [0.3.3] - 2019-09-27
### Added
- Add `labelIsFormat` and `helptextIsFormat` getters for properties

## [0.3.2] - 2019-09-26
### Fixed
- Ensure ConditionTargets are constructed after obtaining all target properties
- Use targetType when resolving rule dependencies
- Redefine items args not properly handled by babel
- Fix bug where synchronous entity initialization called set() asynchronously
- Fix bug where constant values for properties could be initialized before type dependencies
- Fix bug where newValue was not included in EntityChangedEventArgs when rule predicates change in certain cases
### Added
- Use utility method alternative to Object.entries
- Add support for serializing a specific property of an entity, optionally forcing an output even if a converter ignores the property.
- Add support for specifying a custom condition type code for property errors
- Add support for specifying additional predicates to a ValidationRule
- Add support for additional ValidationRule predicates in a property error definition
- Add support for specifying a resource to use as property error message

## [0.3.1] - 2019-09-17
### Added
- Support token value post processing when calling `Entity.toString()`

## [0.2.0] - 2019-09-13
### Fixed
- Remove babel polyfilling

## [0.1.1] - 2019-09-13
### Added
- Added repository info to package

## [0.1.0] - 2019-09-13
### Added
- Published first initial version `0.1.0`
