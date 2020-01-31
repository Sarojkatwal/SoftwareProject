class Userdetail {
  constructor() {
    this.username = "";
    console.log("Hello from  constructor userdetail ", this.username);
  }
  setUsername(name) {
    this.username = name;
  }
  getUsername(name) {
    return this.username;
  }
}
export default new Userdetail();
