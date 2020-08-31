import {NameChanged, GobelinRegistryContract} from '../generated/GobelinRegistry/GobelinRegistryContract';
import {NamedEntity} from '../generated/schema';
import {log} from '@graphprotocol/graph-ts';

const zeroAddress = '0x0000000000000000000000000000000000000000';

export function handleNameChanged(event: NameChanged): void {
  const id = event.params.user.toHex();
  let entity = NamedEntity.load(id);
  if (!entity) {
    entity = new NamedEntity(id);
  }
  entity.name = event.params.name;
  entity.save();
}
