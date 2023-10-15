class DotLinkedList {
    head;
    
    constructor() {
      this.head = null;
    }
  
    append(dot) {
      if (!this.head) {
        this.head = dot;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = dot;
      }
    }
  
    render(scene) {
      let current = this.head;
      while (current) {
        scene.add(current.points);
        current = current.next;
      }
    }
  }

  export default DotLinkedList;