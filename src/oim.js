import { Set } from 'immutable';

export default class OIM {
  static aspectValues(facts, aspect) {
    return Set(facts.map(f => f.aspects[aspect]))
  }
  static aspects(facts) {
    return Set(facts.map(f => Set(Object.entries(f.aspects)
                              .map(([aspect, aspectValue]) => aspectValue))))
           .flatten()
  }
  static taxonomyDefinedAspects(facts) {
    return this.aspects(facts).filter(a => !a.startsWith("xbrl:"))
  }
  static coreAspects(facts) {
    return this.aspects(facts).filter(a => a.startsWith("xbrl:"))
  }
}