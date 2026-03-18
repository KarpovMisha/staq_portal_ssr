import { isValidElement } from 'react';
import yaml from 'js-yaml';

/**
 * Gets nested data from object-like structure
 * @param {object} obj - object to get data from
 * @param {string|array} path - path to get path
 * @param {*} separator - separator to split path when passed as string
 * @returns {any}
 * @example
 * const data = { user: { profile: { name: 'Awesome' } } };
 * const name = getIn(data, 'user.profile.name');
 */
export function getIn(obj, path, separator = '.') {
  const paths = path.constructor === Array ? path : path.split(separator);
  const pathsLength = paths.length;
  let resultData = obj || {};

  // loop is much faster than something like reduce:
  // paths.reduce((p, c) => p && p[c], obj);

  for (let i = 0; i < pathsLength; i++) {
    const c = paths[i];
    const curData = resultData[c];
    if (!curData) return curData;

    resultData = curData;
  }

  return resultData;
}

export function isDOMTypeElement(element) {
  return isValidElement(element) && typeof element.type === 'string';
}

export function parseApiYaml(text) {
  const doc = yaml.load(text);
  const subMenuArray = [];
  Object.keys(doc.paths).forEach((key) => {
    Object.keys(doc.paths[key]).forEach((item) => {
      let tag;
      if (doc.paths[key][item].tags) {
        tag = doc.paths[key][item].tags[0];
      } else {
        tag = 'default';
      }
      if (!doc.paths[key][item].operationId) {
        subMenuArray.push({
          name: item + ' ' + key,
          anchor: '#/' + tag + '/'
        });
      } else {
        subMenuArray.push({
          name: doc.paths[key][item].operationId,
          anchor: '#/' + tag + '/' + doc.paths[key][item].operationId,
        });
      }
    });
  });
  return subMenuArray;
}

export const checkPathMatch = (pathToCheck, pathName) => pathName.indexOf(pathToCheck) !== -1;

export const checkPath = (path, target) => {
  const route = path.split('/').slice(1)[0];
  return route === target;
};

export function getNodeLink(id) {
  return document.getElementById(id);
}

export function scrollTo(containerNode, toNode) {
  if (containerNode && toNode ) {
    containerNode.scrollTo({
      top: toNode.offsetTop - 10,
      behavior: 'smooth',
    });
  }
}

export function generateCompanyLogo(name) {
  const companyLogo = name
      .split(' ')
      .filter(Boolean)
      .map((word) => word[0].toUpperCase())
      .slice(0, 2)
      .join('');

  return companyLogo;
}

/*
  will return an array of elements found by str in field
  data -> array of items
  field -> in which field to search for matches
  str -> a string by which I look for matches in the field
*/
export default function autocomplete(data = [], str, fields) {
  if (!Array.isArray(data)) {
    throw new Error('You must provide an array.');
  }

  if (typeof str !== 'string') {
    throw new Error('the str must be a string.');
  }

  const list = data.filter((c) => {
    let q = str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    const reg = new RegExp(q, 'gi');

    if (typeof fields !== 'string') {
      return fields.some(field => reg.test(c[field]));
    }
    return reg.test(c[fields]);
  });
  return list;
}
