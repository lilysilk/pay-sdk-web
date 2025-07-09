import { forEach } from "lodash-es";

const scriptCacheMap = new Map<string, Promise<any>>();

export const loadExternalScript = (
  id: string,
  src: string,
  attributes?: Record<string, string>
) => {
  const cachedLoadPromise = scriptCacheMap.get(id);
  if (cachedLoadPromise) {
    return cachedLoadPromise;
  }
  const loadPromise = new Promise((resolve, reject) => {
    if (document.getElementById(id)) return resolve(true);
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("id", id);
    script.setAttribute("src", src);
    forEach(attributes, (value, key) => {
      script.setAttribute(key, value);
    });

    script.addEventListener("load", resolve);
    script.addEventListener("error", () =>
      reject(new Error(`Error loading ${id}.`))
    );
    script.addEventListener("abort", () =>
      reject(new Error(`${id} loading aborted.`))
    );
    document.getElementsByTagName("head")[0].appendChild(script);
  });
  scriptCacheMap.set(id, loadPromise);
  return loadPromise;
};
