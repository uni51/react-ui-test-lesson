import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// テスト対象のコンポーネントのimport
import AsyncComponent from "./AsyncComponent";

// user-eventのセットアップ
const user = userEvent.setup();

// 非同期処理が含まれるコンポーネントのテストスイートの開始
describe("AsyncComponent", () => {
  // ボタンをクリックすると非同期処理が実行されることを確認するテスト
  it("ボタンをクリックすると非同期処理が実行される", async () => {
    // 非同期処理を含むコンポーネントを描画
    render(<AsyncComponent />);

    // 初期テキストが表示されていることを検証
    expect(screen.getByText("Initial text")).toBeInTheDocument();

    // ボタンを取得
    const button = screen.getByRole("button");

    // ボタンをクリックするアクションを実行
    await user.click(button);

    // ローディング中のテキストが表示されていることを検証
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // 更新後のテキストが表示されるまで待機
    await waitFor(
      () => {
        // 更新後のテキストが表示されていることを検証
        expect(screen.getByText("Updated text")).toBeInTheDocument();
      },
      {
        // インターバルとタイムアウトを指定して待機
        interval: 50,
        timeout: 3000,
      }
    );
  });
});
