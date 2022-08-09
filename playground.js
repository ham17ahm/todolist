let items = ["item 1", "item 2", "item 3", "item 4"];

let obj = {
  items,
};

items.push("item 5");

console.log(obj.items.length);
