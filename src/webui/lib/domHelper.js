export let toggleMenu = toggleDisplayFn('.Menu');
export let toggleGame = toggleDisplayFn('.Game');
export let toggleResults = toggleDisplayFn('#Results');
export let toggleCharacterOptions = toggleDisplayFn('#CharacterOptions');

export function toggleDisplayFn(selector) {
  let classList;
  return onOff => {
    let domElement = document.querySelector(selector);
    classList = classList || domElement.classList;

    if(classList) { // (MSIE10 does not work very well with classList.toggle)
      if(onOff) classList.remove('hidden');
      else classList.add('hidden');
    }
    else { // (MSIE9 does not know what is classList)
      if(onOff) domElement.className = domElement.className.replace(/ hidden/g, '');
      else domElement.className = domElement.className.replace(/ hidden/g, '') + ' hidden';
    }
  };
}
