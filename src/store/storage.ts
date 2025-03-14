export function loadState<T>(key: string): T | undefined {
 try {
  const jsonState = localStorage.getItem(key);
  if (!jsonState) {
   return undefined;
  }
  return JSON.parse(jsonState);
 } catch (e) {
  console.error(e);
  return undefined;
 }
}

export function saveState<T>(state: T, key: string) {
 const stringState = JSON.stringify(state);
 localStorage.setItem(key, stringState);
}



export function pushCity(newValue: string, key: string) {
 const existingData = localStorage.getItem(key);
 const updatedArray: string[] = existingData ? JSON.parse(existingData) : [];

 if (!newValue.trim()) return; 
 if (updatedArray.includes(newValue)) {
  console.log(2);
   return "Такой город уже есть";
 }

 if (updatedArray.length >= 4) {
  console.log(3);
   return;
 }
 console.log(4);

 updatedArray.push(newValue);
 localStorage.setItem(key, JSON.stringify(updatedArray));
}