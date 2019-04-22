import isObject from 'lodash/isObject';

const domSelector = (cssSelector) => document.querySelector(cssSelector);
const domValue = (selector) => selector.innerText;

const scrapSelectorFields = (selector, section) => async (scrapedObjectPromise, fieldKey) => {
  const scrapedObject = await scrapedObjectPromise
  const field = section.fields[fieldKey]

  // currently field can be a selector string, or an object containing a selector field
  const fieldSelectorString = await field.selector
    ? field.selector
    : field

  const isFieldPresent = await selector.$(fieldSelectorString)

  if (!isFieldPresent) { return scrapedObject }

  if (field.isMultipleFields) {
    scrapedObject[fieldKey] = await selector.$$eval(fieldSelectorString, (elems) => elems.map(elem => elem.innerText))
  } else if (field.hasChildrenFields) {
    const fieldChildrenSelectors = await selector.$$(field.selector)

    scrapedObject[fieldKey] = await Promise.all(
      fieldChildrenSelectors.map((s) => scrapSelector(s, field))
    )
  } else if (field.attribute && field.attribute === 'href') {
    scrapedObject[fieldKey] = await selector.$eval(fieldSelectorString, (elem) => elem ? elem.href : '')
  } else {
    scrapedObject[fieldKey] = await selector.$eval(fieldSelectorString, (elem) => elem ? elem.innerText : '')
  }

  return scrapedObject
}

const scrapSelector = (selector, section) =>
  Object.keys(section.fields)
    .reduce(scrapSelectorFields(selector, section), Promise.resolve({}))


/**
   positions: {
    selector: 'section[id=experience-section] li.pv-profile-section',
    fields: {
      title: 'h3',
      companyName: 'span.pv-entity__secondary-title',
      location: 'pv-entity__location span:nth-child(2)',
      description: 'p[class~=pv-entity__description]',
      date1: 'h4.pv-entity__date-range span:nth-child(2)',
      date2: '.pv-entity__bullet-item-v2',
      roles: {
        selector: '.pv-entity__role-details',
        hasChildrenFields: true,
        fields: {
          title: 'h3 span:not(.visually-hidden)',
          date1: 'h4.pv-entity__date-range span:nth-child(2)',
          date2: '.pv-entity__bullet-item-v2',
          location: 'pv-entity__location span:nth-child(2)'
        }
      }
    }
  }
  **/
const scrapSectionFiles = (selector, fields) => {
  console.log(selector);
};

const scrapSection = (section) => section.fields ? scrapSection(section.fields) : scrapSectionFiles(section);

const scrapper = (template) => {
  return Object.keys(template).reduce(
    (collector, section) => 
      Object.assign({}, collector, scrapSection(section)), {}
    )
};

exports.scrapper = (template) => scrapper(template);