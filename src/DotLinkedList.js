import Dot from "./shapes/Dot";
/**
 * This class represents a linked list of dots.
 * @constructor @param {number} length - The length of the linked list.
 * @property {Dot} _head - The first dot of the linked list.
 * To do: Implement a way to pass the position of the dots in the linked list.
 * by default it is i,0,0 when creating the linked list from 0..length.
 */
class DotLinkedList {
  _head;
  _tail;
  _current;
  _cnt;

  constructor() {
    this._head = null;
    this._tail = null;
    this._current = null;
    this._cnt = 0;
  }

  /**
   * This method creates a linked list of dots given a
   * length and returns the linked list.
   * @param {number} length
   * @returns {DotLinkedList} list
   *  To do : Implement a way to pass the position of the dots in the linked list.
   */
  static create(length) {
    const list = new DotLinkedList();
    for (let i = 0; i < length; i++) {
      const dot = new Dot(0xff0000, 0.1);
      dot.setPosition(i, i + 0.5, i + 0.7);
      list.append(dot);
    }
    list._tail = list._head;
    list._current = null;
    return list;
  }

  next() {
    if (this._current === null) {
      this._current = this._head;
    } else {
      this._current = this._current.next;
      if (this._current === null) {
        this._current = this._head;
        return null;
      }
    }

    return this._current;
  }

  get(index) {
    if (index < 0 || index >= this._cnt) {
      throw new Error(`Invalid index: ${index}`);
    }

    let current = this._head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current;
  }

  current() {
    return this._current;
  }
  length() {
    return this._cnt;
  }
  /**
   * This method appends a dot to the end of the linked list.
   * @param {Dot} dot
   */
  append(dot) {
    if (!this._head) {
      this._head = dot;
      this._tail = dot;
    } else {
      this._tail.next = dot;
      this._tail = dot;
    }
    this._cnt++;
  }

  /**
   * This method renders the complete linked list of dots in the scene.
   * @param {Scene} scene
   */
  render(scene) {
    let _current = this._head;
    while (_current) {
      scene.add(_current.points);
      _current = _current.next;
    }
  }
}

export default DotLinkedList;
