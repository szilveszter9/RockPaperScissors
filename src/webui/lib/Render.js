import log from '../../lib/appLog.js';

export async function render(target, elements, doNotOverwrite) {
  log.info('render:', ...arguments);
  if(!Array.isArray(elements)) {
    log.error(
      'ERROR HERE =====> Render Error: elements must be an array.',
      'Target is:',
      target
    );
    return;
  }
  let targetElem = getTargetElem(target);

  if(!doNotOverwrite)
    targetElem.innerHTML = '';

  let renderers = getRenderers(targetElem, elements);

  for(let i = 0; i < renderers.length; i++) {
    await renderers[i];
  }

  return targetElem;
}

function getTargetElem(target) {
  let targetElem;
  if(typeof target === 'string') {
    let targetID = target;
    targetElem = document.getElementById(targetID);

    if(!targetElem) {
      targetElem = document.createElement('div');
      targetElem.setAttribute('id', targetID);
    }
  }
  else
    targetElem = target;

  return targetElem;
}

function getRenderers(targetElem, elements) {
  return elements.map(async elem => {
    if(!elem) {
      log.error(
        'ERROR HERE =====> Render Error: empty elem in elements.',
        'Forgot a comma between the elements? Target element is:',
        target
      );
      return targetElem;
    }
    let [ cls, args ] = elem;
    let instance = new cls(args);
    let template;

    try {
      template = await instance.render(args);
    } catch(e) {
      log.error(
        'An error occured during rendering, please check your render method',
        cls.prototype.constructor.name,
        'class',
        e
      );
    }

    writeToTarget(targetElem, cls, template);

    return targetElem;
  });
}

function writeToTarget(targetElem, cls, template) {
  if(typeof template === 'string') {
    let div = document.createElement('div');
    let className = cls.prototype.constructor.name || cls.toString().match(/^function (\w+)/)[1];
    div.setAttribute('class', className);
    div.innerHTML = template;
    template = div;
  }
  if(template)
    targetElem.appendChild(template);
}
