import Trie "mo:base/Trie";
import Principal "mo:base/Principal";

actor class Backend() {
  // stable var counter = 0;

  // Get the current count
  // public query func get() : async Nat {
  //   counter;
  // };

  // // Increment the count by one
  // public func inc() : async () {
  //   counter += 1;
  // };

  // // Add `n` to the current count
  // public func add(n : Nat) : async () {
  //   counter += n;
  // };

  // public func reset() : async () {
  //   counter := 0;
  // };

  // stable var counter = 0;
  
  type UserData = {
    name : Text;
    email : Text;
    password : Text;
  };
  
  stable var users : Trie.Trie<Principal, UserData> = Trie.empty();

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
  }


};
