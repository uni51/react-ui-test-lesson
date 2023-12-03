import { render, screen } from "@testing-library/react";
import Button from "./Button";

// このブロックはButtonコンポーネントのテストスイートを定義しています。
describe("Button", () => {
  // これはスイート内の個々のテストケースです。
  it("buttonタグがレンダリングされる", () => {
    // "ボタン"というラベルとクリックハンドラを持つButtonコンポーネントをレンダリングします。
    render(<Button label="ボタン" onClick={() => alert("click")} />);

    // screen.getByRoleを使用して、レンダリングされたコンポーネント内のbutton要素を検索します。
    const element = screen.getByRole("button");

    // ボタン要素がドキュメント内に存在することをアサートします。
    expect(element).toBeInTheDocument();

    // ボタン要素が正しいテキストコンテンツを持っていることをアサートします。
    expect(element).toHaveTextContent("ボタン");
  });
});
