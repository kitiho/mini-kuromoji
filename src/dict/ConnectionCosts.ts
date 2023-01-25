class ConnectionCosts {
  buffer: Int16Array
  forward_dimension: number
  backward_dimension: number

  constructor(forward_dimension: number, backward_dimension: number) {
    this.forward_dimension = forward_dimension
    this.backward_dimension = backward_dimension
    // leading 2 integers for forward_dimension, backward_dimension, respectively
    this.buffer = new Int16Array(forward_dimension * backward_dimension + 2)
    this.buffer[0] = forward_dimension
    this.buffer[1] = backward_dimension
  }
}

export default ConnectionCosts
