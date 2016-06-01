export async function render(target, elements, doNotOverwrite) {
  if(!Array.isArray(elements)) {
    console.log(
      'ERROR HERE =====> Render Error: elements must be an array.',
      'Target is:',
      target
    );
    return;
  }
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

  if(!doNotOverwrite)
    targetElem.innerHTML = '';

  let renderers = elements.map(async elem => {
    if(!elem) {
      console.log(
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
      template = await instance.render();
    } catch(e) {
      console.log(
        'An error occured during rendering, please check your render method',
        cls.prototype.constructor.name,
        'class',
        e
      );
    }
    if(typeof template === 'string') {
      let div = document.createElement('div');
      div.setAttribute('class', cls.prototype.constructor.name);
      div.innerHTML = template;
      template = div;
    }
    if(template)
      targetElem.appendChild(template);
    return targetElem;
  });

  for(let i = 0; i < renderers.length; i++) {
    await renderers[i];
  }

  return targetElem;
}
