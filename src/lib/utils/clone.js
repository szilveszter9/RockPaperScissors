// telling that async is a hack, due to some babelify 7.x issues at the moment
export default async function clone(obj) {
  let cloned;
  try {
    cloned = JSON.parse(JSON.stringify(obj));
  } catch(e) {}
  return cloned;
}
