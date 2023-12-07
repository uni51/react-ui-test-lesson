import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// テスト対象のコンポーネントのimport
import Form from "./Form";

// user-eventのセットアップ
const user = userEvent.setup();

// テストスイートの開始
describe("Form", () => {
  // フォームが初期状態ではテキストが空欄であることを確認するテスト
  it("初期状態ではテキストは空欄", () => {
    // フォームコンポーネントを描画
    render(<Form />);

    // フォーム内のテキスト入力を取得
    const input = screen.getByPlaceholderText("Enter text");

    // テキスト入力が存在し、かつテキストが空であることを検証
    expect(input).toBeInTheDocument();
    expect(input).toHaveTextContent("");
  });

  // テキストを入力してフォームをサブミットし、アラートが表示されることを確認するテスト
  it("入力したテキストがサブミットされる", async () => {
    // window.alert関数のスパイを作成し、戻り値をモック化
    const alertSpy = jest.spyOn(window, "alert").mockReturnValue();

    // フォームコンポーネントを描画
    render(<Form />);

    // フォーム内のテキスト入力を取得
    const input = screen.getByPlaceholderText("Enter text");

    // テキストを入力するアクションを実行
    await user.type(input, "Test Text");

    // テキスト入力が正しく更新されたことを検証
    expect(screen.getByDisplayValue("Test Text")).toBeInTheDocument();

    // フォーム内のサブミットボタンを取得
    const button = screen.getByRole("button");

    // サブミットボタンをクリックするアクションを実行
    await user.click(button);

    // アラート関数が正しく呼び出されたことを検証
    expect(alertSpy).toHaveBeenCalledWith("submitted: Test Text");
  });
});
