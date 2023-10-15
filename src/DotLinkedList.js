
/**
 * This class represents a linked list of dots.
 */
class DotLinkedList {
    head;

    constructor() {
      this.head = null;
    }
  
    /**
     * This method appends a dot to the end of the linked list.
     * @param {Dot} dot 
     */
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
  
    /**
     * This method renders the complete linked list of dots in the scene.
     * @param {Scene} scene 
     */
    render(scene) {
      let current = this.head;
      while (current) {
        scene.add(current.points);
        current = current.next;
      }
    }
  }

  export default DotLinkedList;