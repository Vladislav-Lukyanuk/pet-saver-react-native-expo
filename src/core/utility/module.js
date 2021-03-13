export const defineModule = (
    title,
    component,
    reducer = (state = {}) => state,
) => {
  return {title, component, reducer};
};

export const flatModules = (modules) =>
  Object.keys(modules)
      .map((x) => {
        const res = Array.isArray(modules[x]) ? modules[x] : [modules[x]];
        res.forEach((y) => (y.MODULE = x));
        return res;
      })
      .reduce((c, n) => c.concat(n));

export const combineModuleReducers = (modules) => {
  const reducers = {};
  const flat = flatModules(modules);
  for (let i = 0; i < flat.length; i++) {
    const red = flat[i].reducer;
    if (typeof red !== 'function') {
      throw new Error('Module ' + i + ' does not define reducer!');
    }

    reducers[flat[i].MODULE] = red;

    if (typeof flat[i].children === 'object') {
      // eslint-disable-next-line guard-for-in
      for (const j in flat[i].children) {
        if (typeof flat[i].children[j].reducer !== 'function') {
          throw new Error('Module ' + j + ' does not define reducer!');
        }

        reducers[j] = flat[i].children[j].reducer;
      }
    }
  }

  return reducers;
};
