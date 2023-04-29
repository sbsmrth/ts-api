interface User {
    id: string,
    name: string,
    lastName: string
}

interface Product {
    id: string,
    name: string,
    price: number,
}


class BaseRepository<T> {
  private list: T[] = [];

  public add(item: T): T {
    this.list.push(item);
    return item;
  }

  public remove(index: number): void {
    this.list.splice(index, 1);
  }
}

const userRepository = new BaseRepository<User>();
const productRepository = new BaseRepository<Product>();

userRepository.add({
    id: "cc1234",
    name: "Juan",
    lastName: "Martinez",
})

productRepository.add({
    id: "cpp345",
    name: "smartwatch",
    price: 30000
})

