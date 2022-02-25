import { AnyEntity } from '@mikro-orm/core';
import { isCollection } from './is-collection.util';
import { isEntity } from './is-entity.util';

export function serializeEntity(item: AnyEntity) {
  const result = {} as Record<string | symbol, unknown>;
  for (const key of Reflect.ownKeys(item)) {
    if (typeof key === 'symbol') {
      continue;
    }
    const value = item[key as string];
    if (isCollection(value)) {
      result[key] = value.getSnapshot();
    } else if (isEntity(value)) {
      result[key] = serializeEntity(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}