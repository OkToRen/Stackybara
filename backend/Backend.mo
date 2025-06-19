import Trie "mo:base/Trie";
import Principal "mo:base/Principal";

actor class Backend() {
  // stable var counter = 0;

  // Get the current count
  public query func get() : async Nat {
    counter;
  };

  // Increment the count by one
  public func inc() : async () {
    counter += 1;
  };

  // Add `n` to the current count
  public func add(n : Nat) : async () {
    counter += n;
  };

  public func reset() : async () {
    counter := 0;
  };

  stable var counter = 0;
  
  type UserData = {
    name : Text;
    email : Text;
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

};
