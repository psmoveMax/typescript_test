class TreeStore {
  items: Array<{ id: number | string, parent: string | number, type?: string | null }>;

  constructor(items: Array<{ id: number, parent: string | number, type?: string | null }>) {
    this.items = items;
  }

  // Метод для возвращения изначального массива элементов
  getAll() {
    console.log(JSON.stringify(this.items));
  }

  // Принимает id элемента и возвращает сам объект элемента
  getItem(id: number | string) {
    const item = this.items.filter(item => item.id === id)[0];
    console.log(JSON.stringify(item));
  }
  // Принимает id элемента и возвращает массив элементов, являющихся дочерними для того элемента,
  getChildren(id: number | string) {
    const children = this.items.filter(item => item.parent === id);

    console.log(JSON.stringify(children));
  }

  // Принимает id элемента и возвращает массив элементов, являющихся дочерними для того элемента. До самого глубого уровня
  getAllChildrenAll(id: string | number) {
    const children = this.items.filter(item => item.parent === id);
    let result: Array<{ id: number, parent: string | number, type?: string | null }> = [];

    for (const child of children) {
      const ids = typeof child.id === 'string' ? parseInt(child.id, 10) : child.id;
      result.push({ ...child, id: ids });
      result = result.concat(this.getAllChildrenAll(child.id));
    }

    result.sort((a, b) => a.id - b.id);
    return result;
  }

  // Метод для получения всех родительских элементов с сохранением порядка
  getAllParents(id: string | number): Array<{ id: number, parent: string | number, type?: string | null }> {
    const parentsStack: Array<{ id: number, parent: string | number, type?: string | null }> = [];
    let currentId: number | string = id;

    while (currentId !== 'root') {
      const parent = this.items.filter(item => item.id === currentId)[0];

      if (!parent) {
        break;
      }


      if (currentId !== id) {
        parentsStack.unshift(parent as { id: number, parent: string | number, type?: string | null });
      }

      currentId = parent.parent;
    }
    return parentsStack.reverse();
  }

}


const items = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },

  { id: 6, parent: 2, type: 'test2' },
  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },


  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);

ts.getAll();

ts.getItem(6);

ts.getChildren(4);

console.log(JSON.stringify(ts.getAllChildrenAll(2)));

console.log(JSON.stringify(ts.getAllParents(8)));

