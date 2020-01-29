function generateController(size) {
  let array;

  function flush() {
    const temp = [...Array(2 * size)],
      ids = temp.map((e, i) => i >> 1),
      scrambled = temp.map((e, i) => {
        const randomIndex = Math.floor((size - i) * Math.random())
        return ids.splice(randomIndex, 1)
      });

    array = scrambled.map(id => ({
      flipped: false,
      id
    }));
  }

  function flip(index) {
    const card = array[index],
      result = card.flipped ? 0 : card.id;

    card.flipped = true;

    return result;
  }

  function flop(index) {
    array[index].flipped = false;
  }

  flush();

  return { flip, flop, flush };
}
