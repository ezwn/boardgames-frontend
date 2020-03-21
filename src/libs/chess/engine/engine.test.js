import { computeState, PlayerColor } from "./engine";

test('simple piece move', () => {
  const state = computeState([{
    from: { l: 0, c: 0 },
    to: { l: 0, c: 1 }
  }], {
    player: PlayerColor.WHITE,
    board: [
      "k "
    ],
    jail: {
      [PlayerColor.WHITE]: "",
      [PlayerColor.BLACK]: ""
    }
  });
  expect(state.board[0]).toBe(" k");
});

test('castling 1', () => {
  const state = computeState([{
    from: { l: 0, c: 4 },
    to: { l: 0, c: 6 }
  }], {
    player: PlayerColor.WHITE,
    board: [
      "T   K  T"
    ],
    jail: {
      [PlayerColor.WHITE]: "",
      [PlayerColor.BLACK]: ""
    }
  });
  expect(state.board[0]).toBe("T    TK ");
});

test('castling 2', () => {
  const state = computeState([{
    from: { l: 0, c: 4 },
    to: { l: 0, c: 2 }
  }], {
    player: PlayerColor.WHITE,
    board: [
      "T   K  T"
    ],
    jail: {
      [PlayerColor.WHITE]: "",
      [PlayerColor.BLACK]: ""
    }
  });
  expect(state.board[0]).toBe("  KT   T");
});
