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
    name : Text;
    email : Text;
    password : Text;
  };

  type Product = {
    id: Nat32;
    owner: Principal;
    name: Text;
    description: Text;
    image: Text;
    price: Nat32;
    stock: Nat32;
  };
  
  type StoreProfile = {
    name: Text;
    tagline: Text;
    location: Text;
  };

  type Order = {
    id: Nat;
    buyer: Principal;
    seller: Principal;
    productId: Nat32;
    quantity: Nat32;
    totalPrice: Nat32;
    status: Text; // "New", "Shipped", "Completed"
  };

  stable var users : Trie.Trie<Principal, UserData> = Trie.empty();
  stable var products: Trie.Trie<Nat32, Product> = Trie.empty(); // Changed from Nat to Nat32
  stable var storeProfiles: Trie.Trie<Principal, StoreProfile> = Trie.empty();
  stable var orders: Trie.Trie<Nat, Order> = Trie.empty();

  stable var nextProductId: Nat32 = 0; // Changed from Nat to Nat32
  stable var nextOrderId: Nat = 0;

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

  public shared(msg) func createProduct(name: Text, description: Text, image: Text, price: Nat32, stock: Nat32) : async () {
    let owner = msg.caller;
    let id = nextProductId;
    
    let newProduct: Product = {
      id = id;
      owner = owner;
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

  public query func getMyProducts(principal: Principal) : async [Product] {
    let allProducts = Trie.toArray<Nat32, Product, Product>(products, func (k : Nat32, v : Product) : Product = v);
    Array.filter<Product>(allProducts, func(product: Product) : Bool = Principal.equal(product.owner, principal))
  };

  public shared(msg) func updateProduct(id: Nat32, newName: Text, newPrice: Nat32, newStock: Nat32) : async Bool {
    let caller = msg.caller;
    let productKey = { hash = id; key = id };

    switch(Trie.get(products, productKey, Nat32.equal)) {
      case (null) { return false; };
      case (?product) {
        if (Principal.equal(product.owner, caller)) {
          let updatedProduct: Product = {
            id = product.id;
            owner = product.owner;
            description = product.description;
            image = product.image;
            name = newName; 
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

  public shared(msg) func deleteProduct(id: Nat32) : async Bool {
    let caller = msg.caller;
    let productKey = { hash = id; key = id };
    
    switch(Trie.get(products, productKey, Nat32.equal)) {
      case (null) { return false; };
      case (?product) {
        if (Principal.equal(product.owner, caller)) {
          let (updatedProducts, _) = Trie.remove(products, productKey, Nat32.equal);
          products := updatedProducts;
          return true;
        } else {
          return false;
        };
      };
    };
  };

  public query func getMyOrders(principal: Principal) : async [Order] {
    let allOrders = Trie.toArray<Nat, Order, Order>(orders, func (k : Nat, v : Order) : Order = v);
    Array.filter<Order>(allOrders, func(order: Order) : Bool = Principal.equal(order.seller, principal))
  };
  
  public query func getStoreProfile(owner: Principal) : async ?StoreProfile {
    let profileKey = { hash = Principal.hash(owner); key = owner };
    return Trie.get(storeProfiles, profileKey, Principal.equal);
  };
  
  public shared(msg) func updateStoreProfile(name: Text, tagline: Text, location: Text) : async () {
    let owner = msg.caller;
    let profileKey = { hash = Principal.hash(owner); key = owner };
    
    let updatedProfile: StoreProfile = { name = name; tagline = tagline; location = location };
    
    let (updatedProfiles, _) = Trie.put(storeProfiles, profileKey, Principal.equal, updatedProfile);
    storeProfiles := updatedProfiles;
  };

};