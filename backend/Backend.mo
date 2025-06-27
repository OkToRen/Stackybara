import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Nat32 "mo:base/Nat32";
import Hash "mo:base/Hash";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";

actor class Backend() {

  private func _natHash(n : Nat) : Nat32 {
    let n32 = Nat32.fromNat(n % (2**32));
    let high = Nat32.fromNat((n / (2**32)) % (2**32));
    n32 ^ (high * 31);
  };
  
  type UserData = {
    principal : Principal;
    name : Text;
    email : Text;
    password : Text;
    userLocation : Text;
    isSeller : Bool;
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
    name: Text;
    description: Text;
    image: Text;
    price: Nat32;
    stock: Nat32;
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

  

  stable var users : Trie.Trie<Principal, UserData> = Trie.empty();
  stable var products: Trie.Trie<Nat32, Product> = Trie.empty(); // Changed from Nat to Nat32
  stable var stores: Trie.Trie<Nat32, Store> = Trie.empty();
  stable var orders: Trie.Trie<Nat32, Order> = Trie.empty();

  stable var nextProductId: Nat32 = 0; // Changed from Nat to Nat32
  stable var nextOrderId: Nat32 = 0;

  public shared(msg) func registerUser(data : UserData) : async Text {
    let user = msg.caller;

    let userKey = { hash = Principal.hash(user); key = user };
    let result = Trie.get(users, userKey, Principal.equal);
    
    if (result == null) {
      let (updatedUsers, _) = Trie.put(users, userKey, Principal.equal, data);
      users := updatedUsers;
      return "User registered";
    } else {
      return "User already registered";
    }
  };

  stable var loggedInUsers : Trie.Trie<Principal, Bool> = Trie.empty();

  public shared(msg) func loginUser(data : UserData) : async Text {
    let user = msg.caller;
    let userKey = { hash = Principal.hash(user); key = user };
    let result = Trie.get(users, userKey, Principal.equal);

    switch (result) {
      case (null) return "User not registered";
      case (?storedData) {
        if (storedData.password == data.password) {
          let (updatedLogins, _) = Trie.put(loggedInUsers, userKey, Principal.equal, true);
          loggedInUsers := updatedLogins;
          return "Login successful";
        } else {
          return "Incorrect password";
        };
      };
    };
  };

  public shared(msg) func isLoggedIn() : async Bool {
    let user = msg.caller;
    let userKey = { hash = Principal.hash(user); key = user };
    switch (Trie.get(loggedInUsers, userKey, Principal.equal)) {
      case (null) return false;
      case (?loggedIn) return loggedIn;
    };
  };

  func _requireLogin(caller: Principal) : Bool {
    let userKey = { hash = Principal.hash(caller); key = caller };
    switch (Trie.get(loggedInUsers, userKey, Principal.equal)) {
      case (?true) return true;
      case _ return false;
    };
  };

  public shared(msg) func logoutUser() : async Text {
    let user = msg.caller;
    let userKey = { hash = Principal.hash(user); key = user };

    let (updatedLogins, _) = Trie.remove(loggedInUsers, userKey, Principal.equal);
    loggedInUsers := updatedLogins;
    return "User logged out";
  };

  public query func getAllUsers() : async [(Principal, UserData)] {
    return Trie.toArray<Principal, UserData, (Principal, UserData)>(users, func (k : Principal, v : UserData) : (Principal, UserData) = (k, v));
  };

  public shared(msg) func getUser() : async ?UserData {
    let user = msg.caller;
    let userKey = { hash = Principal.hash(user); key = user };
    return Trie.get(users, userKey, Principal.equal);
  };

  public shared(msg) func deleteUser() : async Text {
    let user = msg.caller;
    let userKey = { hash = Principal.hash(user); key = user };
    
    if (Trie.get(users, userKey, Principal.equal) != null) {
      let (updatedUsers, _) = Trie.remove(users, userKey, Principal.equal);
      users := updatedUsers;
      return "User deleted";
    } else {
      return "User not found";
    }
  };

  public shared(msg) func updateUser(data : UserData) : async Text {
    let user = msg.caller;
    let userKey = { hash = Principal.hash(user); key = user };
    
    if (Trie.get(users, userKey, Principal.equal) != null) {
      let (updatedUsers, _) = Trie.put(users, userKey, Principal.equal, data);
      users := updatedUsers;
      return "User updated";
    } else {
      return "User not found";
    }
  };

  /* PRODUCT */
  public shared(msg) func createProduct(
  storeId: Nat32,
  name: Text,
  description: Text,
  image: Text,
  price: Nat32,
  stock: Nat32
) : async () {
  let storeKey = { key = storeId; hash = storeId };
  switch (Trie.get(stores, storeKey, Nat32.equal)) {
    case (?store) {
      if (store.owner != msg.caller) return;
    };
    case (_) { return; };
  };  
  let id = nextProductId;
  
  let newProduct: Product = {
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

  public shared(msg) func getMyProducts(storeId : Nat32) : async [Product] {
    let storeKey = { key = storeId; hash = storeId };
    switch (Trie.get(stores, storeKey, Nat32.equal)) {
      case (?store) {
        if (store.owner != msg.caller) return [];
      };
      case (_) { return []; };
    };
    let allProducts = Trie.toArray<Nat32, Product, Product>(products, func (k : Nat32, v : Product) : Product = v);
    Array.filter<Product>(allProducts, func(product: Product) : Bool = Nat32.equal(product.storeId, storeId))
  };

  public shared(msg) func updateProduct(storeId : Nat32, productId: Nat32, newName: Text, newDesc: Text, newImage: Text, newPrice: Nat32, newStock: Nat32) : async Bool {
    let storeKey = { key = storeId; hash = storeId };
    switch (Trie.get(stores, storeKey, Nat32.equal)) {
      case (?store) {
        if (store.owner != msg.caller) return false;
      };
      case (_) { return false; };
    };

    let productKey = { hash = productId; key = productId };

    switch(Trie.get(products, productKey, Nat32.equal)) {
      case (null) { return false; };
      case (?product) {
        if (Nat32.equal(product.storeId, storeId)) {
          let updatedProduct: Product = {
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

  public shared(msg) func deleteProduct(storeId : Nat32, productId: Nat32) : async Bool {
    let storeKey = { key = storeId; hash = storeId };
      switch (Trie.get(stores, storeKey, Nat32.equal)) {
        case (?store) {
          if (store.owner != msg.caller) return false;
        };
        case (_) { return false; };
    };

    let productKey = { hash = productId; key = productId };
    
    switch(Trie.get(products, productKey, Nat32.equal)) {
      case (null) { return false; };
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

  public func getMyOrders(userPrincipal: Principal) : async [Order] {
    let allOrders = Trie.toArray<Nat32, Order, Order>(orders, func (k : Nat32, v : Order) : Order = v);
    Array.filter<Order>(allOrders, func(order: Order) : Bool = Principal.equal(order.buyer, userPrincipal))
  };
  
  /* STORE */
  public query func getStoreProfile(storeId : Nat32) : async ?Store {
    let profileKey = { hash = storeId; key = storeId };
    return Trie.get(stores, profileKey, Nat32.equal);
  };

  public shared(msg) func updateStoreProfile(
    storeId : Nat32,
    newName : Text,
    newDesc : Text,
    newLocation : Text
  ) : async Bool {
    let storeKey = { key = storeId; hash = storeId };
    switch (Trie.get(stores, storeKey, Nat32.equal)) {
      case (?store) {
        if (store.owner != msg.caller) return false;
        let updatedStore: Store = {
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
      case (_) { return false; };
    };
  };

};