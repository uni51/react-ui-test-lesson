import { act, renderHook } from "@testing-library/react";

// テスト対象のフックのimport
import useCounter from "./useCounter";

// useCounterフックのテストスイートの開始
describe("useCounter", () => {
  // incrementメソッドのテスト
  it("increment", () => {
    // useCounterフックを初期値1でレンダリング
    const { result } = renderHook(() => useCounter(1));

    // 初期値が正しく設定されていることを検証
    expect(result.current.count).toBe(1);

    // incrementメソッドを実行
    act(() => result.current.increment());

    // カウンターが正しく増加したことを検証
    expect(result.current.count).toBe(2);
  });
});

// useCounterフックのテストスイートの再開
describe("useCounter", () => {
  // decrementメソッドのテスト
  it("decrement", () => {
    // useCounterフックを初期値1でレンダリング
    const { result } = renderHook(() => useCounter(1));

    // 初期値が正しく設定されていることを検証
    expect(result.current.count).toBe(1);

    // decrementメソッドを実行
    act(() => result.current.decrement());

    // カウンターが正しく減少したことを検証
    expect(result.current.count).toBe(0);
  });
});
