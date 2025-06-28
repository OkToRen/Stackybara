import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Nat32 "mo:base/Nat32";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Time "mo:base/Time";

actor class Backend() {

  private func _natHash(n : Nat) : Nat32 {
    let n32 = Nat32.fromNat(n % (2 ** 32));
    let high = Nat32.fromNat((n / (2 ** 32)) % (2 ** 32));
    n32 ^ (high * 31);
  };

  type UserData = {
    principal : Principal;
    name : Text;
    email : Text;
    address : Text;
    phone : Text;
    isSeller : Bool;
    createdAt : Time.Time;
    membershipLevel : Text;
  };

  type Store = {
    owner : Principal;
    storeId : Nat32;
    storeName : Text;
    storeDesc : Text;
    storeLocation : Text;
  };

  type Product = {
    productId : Nat32;
    storeId : Nat32;
    name : Text;
    description : Text;
    image : Text;
    price : Nat32;
    stock : Nat32;
  };

  type CartItem = {
    cartId : Nat32;
    productId : Nat32;
    quantity : Nat32;
    subTotal : Nat32;
  };

  type Cart = {
    cartId : Nat32;
    buyer : Principal;
    total : Nat32;
  };

  type orderStatus = {
    #New;
    #Shipped;
    #Completed;
  };

  type Order = {
    orderId : Nat32;
    orderDate : Text;
    buyer : Principal;
    cartId : Nat32;
    productId : Nat32;
    grandTotal : Nat32;
    orderStatus : orderStatus;
    shippingMethod : Text;
    paymentMethod : Text;
  };

  var users : Trie.Trie<Principal, UserData> = Trie.empty();
  stable var products : Trie.Trie<Nat32, Product> = Trie.empty();
  stable var stores : Trie.Trie<Nat32, Store> = Trie.empty();
  stable var orders : Trie.Trie<Nat32, Order> = Trie.empty();

  stable var nextProductId : Nat32 = 1;
  stable var nextOrderId : Nat32 = 1;
  stable var nextStoreId : Nat32 = 1;

  public func registerUser(
    principal : Principal,
    name : Text,
    email : Text,
    address : Text,
    phone : Text,
  ) : async Text {
    let user = principal;

    let key : Trie.Key<Principal> = {
      hash = Principal.hash(user);
      key = user;
    };

    let now = Time.now();

    let cleanData : UserData = {
      principal = user;
      name = name;
      email = email;
      address = address;
      phone = phone;
      isSeller = false;
      createdAt = now;
      membershipLevel = "Silver"; // or "Gold", "Platinum", etc.
    };

    if (Trie.get(users, key, Principal.equal) == null) {
      let (updatedUsers, _) = Trie.put(users, key, Principal.equal, cleanData);
      users := updatedUsers;
      return "User registered";
    } else {
      return "User already registered";
    };
  };

  public query func getAllUsers() : async [(Principal, UserData)] {
    return Trie.toArray<Principal, UserData, (Principal, UserData)>(users, func(k : Principal, v : UserData) : (Principal, UserData) = (k, v));
  };

  // public query func getStoreProfile(storeId : Nat32) : async ?Store {
  //   let profileKey = { hash = storeId; key = storeId };
  //   return Trie.get(stores, profileKey, Nat32.equal);
  // };

  public func getUser(principal : Principal) : async ?UserData {
    let key = { hash = Principal.hash(principal); key = principal };
    Debug.print("returning user");
    return Trie.get(users, key, Principal.equal);
  };

  public query func getUserByPrincipal(principal : Principal) : async ?UserData {
    let key = { hash = Principal.hash(principal); key = principal };
    return Trie.get(users, key, Principal.equal);
  };

  public func deleteUser(principal : Principal) : async Text {
    let user = principal;
    let userKey = { hash = Principal.hash(user); key = user };

    if (Trie.get(users, userKey, Principal.equal) != null) {
      let (updatedUsers, _) = Trie.remove(users, userKey, Principal.equal);
      users := updatedUsers;
      return "User deleted";
    } else {
      return "User not found";
    };
  };

  public func updateUser(principal : Principal, data : UserData) : async Text {
    let user = principal;
    let userKey = { hash = Principal.hash(user); key = user };

    if (Trie.get(users, userKey, Principal.equal) != null) {
      let (updatedUsers, _) = Trie.put(users, userKey, Principal.equal, data);
      users := updatedUsers;
      return "User updated";
    } else {
      return "User not found";
    };
  };

  /* PRODUCT */
  public func createProduct(
    principal : Principal,
    storeId : Nat32,
    name : Text,
    description : Text,
    image : Text,
    price : Nat32,
    stock : Nat32,
  ) : async () {
    let user = principal;
    let storeKey = { key = storeId; hash = storeId };
    switch (Trie.get(stores, storeKey, Nat32.equal)) {
      case (?store) {
        if (store.owner != user) return;
      };
      case (_) { return };
    };
    let id = nextProductId;

    let newProduct : Product = {
      productId = id;
      storeId = storeId;
      name = name;
      description = description;
      image = image;
      price = price;
      stock = stock;
    };

    let key = { key = id; hash = id };
    let (updatedProducts, _) = Trie.put(products, key, Nat32.equal, newProduct);
    products := updatedProducts;

    nextProductId += 1;
  };

  public func getMyProducts(principal : Principal, storeId : Nat32) : async [Product] {
    let user = principal;
    let storeKey = { key = storeId; hash = storeId };
    switch (Trie.get(stores, storeKey, Nat32.equal)) {
      case (?store) {
        if (store.owner != user) return [];
      };
      case (_) { return [] };
    };
    let allProducts = Trie.toArray<Nat32, Product, Product>(products, func(k : Nat32, v : Product) : Product = v);
    Array.filter<Product>(allProducts, func(product : Product) : Bool = Nat32.equal(product.storeId, storeId));
  };

  public func updateProduct(principal : Principal, storeId : Nat32, productId : Nat32, newName : Text, newDesc : Text, newImage : Text, newPrice : Nat32, newStock : Nat32) : async Bool {
    let user = principal;
    let storeKey = { key = storeId; hash = storeId };
    switch (Trie.get(stores, storeKey, Nat32.equal)) {
      case (?store) {
        if (store.owner != user) return false;
      };
      case (_) { return false };
    };

    let productKey = { hash = productId; key = productId };

    switch (Trie.get(products, productKey, Nat32.equal)) {
      case (null) { return false };
      case (?product) {
        if (Nat32.equal(product.storeId, storeId)) {
          let updatedProduct : Product = {
            productId = productId;
            storeId = storeId;
            name = newName;
            description = newDesc;
            image = newImage;
            price = newPrice;
            stock = newStock;
          };
          let (updatedProducts, _) = Trie.put(products, productKey, Nat32.equal, updatedProduct);
          products := updatedProducts;
          return true;
        } else {
          return false;
        };
      };
    };
  };

  public func deleteProduct(principal : Principal, storeId : Nat32, productId : Nat32) : async Bool {
    let user = principal;
    let storeKey = { key = storeId; hash = storeId };
    switch (Trie.get(stores, storeKey, Nat32.equal)) {
      case (?store) {
        if (store.owner != user) return false;
      };
      case (_) { return false };
    };

    let productKey = { hash = productId; key = productId };

    switch (Trie.get(products, productKey, Nat32.equal)) {
      case (null) { return false };
      case (?product) {
        if (Nat32.equal(product.storeId, storeId)) {
          let (updatedProducts, _) = Trie.remove(products, productKey, Nat32.equal);
          products := updatedProducts;
          return true;
        } else {
          return false;
        };
      };
    };
  };

  public func getMyOrders(userPrincipal : Principal) : async [Order] {
    let allOrders = Trie.toArray<Nat32, Order, Order>(orders, func(k : Nat32, v : Order) : Order = v);
    Array.filter<Order>(allOrders, func(order : Order) : Bool = Principal.equal(order.buyer, userPrincipal));
  };

  /* STORE */
  public query func getStoreProfile(storeId : Nat32) : async ?Store {
    let profileKey = { hash = storeId; key = storeId };
    return Trie.get(stores, profileKey, Nat32.equal);
  };

  public func updateStoreProfile(
    principal : Principal,
    storeId : Nat32,
    newName : Text,
    newDesc : Text,
    newLocation : Text,
  ) : async Bool {
    let user = principal;
    let storeKey = { key = storeId; hash = storeId };
    switch (Trie.get(stores, storeKey, Nat32.equal)) {
      case (?store) {
        if (store.owner != user) return false;
        let updatedStore : Store = {
          storeId = store.storeId;
          owner = store.owner;
          storeName = newName;
          storeDesc = newDesc;
          storeLocation = newLocation;
        };

        let (updatedStores, _) = Trie.put(stores, storeKey, Nat32.equal, updatedStore);
        stores := updatedStores;
        return true;
      };
      case (_) { return false };
    };
  };

  public func bindNewStore(
    principal : Principal,
    newName : Text,
    newDesc : Text,
    newLocation : Text,
  ) : async Bool {
    let user = principal;

    let allStores = Trie.toArray<Nat32, Store, Store>(
      stores,
      func(k : Nat32, v : Store) : Store = v,
    );

    let existingStore = Array.find<Store>(
      allStores,
      func(s : Store) : Bool = Principal.equal(s.owner, user),
    );

    switch (existingStore) {
      case null {
        let storeId = nextStoreId;
        nextStoreId += 1;

        let newStore : Store = {
          storeId = storeId;
          owner = user;
          storeName = newName;
          storeDesc = newDesc;
          storeLocation = newLocation;
        };

        let storeKey = { hash = storeId; key = storeId };
        let (updatedStores, _) = Trie.put(stores, storeKey, Nat32.equal, newStore);
        stores := updatedStores;

        return true;
      };
      case (?_) { return false };
    };
  };

};
