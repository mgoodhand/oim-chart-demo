import { Set, Map } from 'immutable';

export default class OIM {
  static aspectValues(facts, aspect) {
    return Set(facts.map(f => f.aspects[aspect]))
  }

  static aspects(facts) {
    return this.breakdowns(facts).flatten()
  }

  static factAspects(fact) {
    return Set(Object.entries(fact.aspects).map(([aspect, aspectValue]) => aspect))
  }

  static breakdowns(facts) {
    return Set(facts.map(f => this.factAspects(f)))
  }

  static taxonomyDefinedAspects(facts) {
    return this.aspects(facts).filter(a => !a.startsWith("xbrl:"))
  }

  static coreAspects(facts) {
    return this.aspects(facts).filter(a => a.startsWith("xbrl:"))
  }

  static aspectValueMap(facts) {
    return this.aspects(facts).map(a => (
      Map([[a, this.aspectValues(facts, a)]])
    ))
    .reduce((m1, m2) => m1.merge(m2), Map())
    .toJSON()
  }

  static factHasMatchingAspect(fact, aspect, aspectValue) {
    const factAspects = Map(fact.aspects)
    if (!factAspects.has(aspect)) {
      // we're looking for exact matches
      return false
    }
    else {
      const fav = factAspects.get(aspect)
      if (!(fav === aspectValue)) {
        return false
      }
    }
    return true
  }

  static aspectMatch(fact, filter) {
    return Map(filter).every((aspectValue, aspect) => this.factHasMatchingAspect(fact, aspect, aspectValue))
  }
}