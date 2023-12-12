import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { UserSearch } from "./UserSearch";

const user = userEvent.setup();

jest.mock("axios");
const mockedAxios = jest.mocked(axios);

// UserSearchコンポーネントに関するテストスイート
describe("UserSearch", () => {
  beforeEach(() => {
    // モックされたaxiosのメソッドをリセットする
    mockedAxios.get.mockReset();
  });

  it("入力フォームに入力した内容でAPIリクエストが送信される", async () => {
    // テスト用のユーザー情報
    const userInfo = {
      id: 1,
      name: "Taro",
    };
    const resp = { data: userInfo };
    mockedAxios.get.mockResolvedValueOnce(resp);

    // UserSearchコンポーネントをレンダリング
    render(<UserSearch />);

    // 入力フォームと検索ボタンを取得
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    // ユーザーが入力フォームに文字を入力
    await user.type(input, userInfo.name);
    // ユーザーが検索ボタンをクリック
    await user.click(button);

    // APIリクエストが正しく発生したことを検証
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `/api/users?query=${userInfo.name}`
    );
  });

  it("APIから取得したユーザー情報が画面に表示される", async () => {
    // テスト用のユーザー情報
    const userInfo = {
      id: 1,
      name: "Taro",
    };
    const resp = { data: userInfo };
    mockedAxios.get.mockResolvedValueOnce(resp);

    // UserSearchコンポーネントをレンダリング
    render(<UserSearch />);

    // 入力フォームと検索ボタンを取得
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    // ユーザーが入力フォームに文字を入力
    await user.type(input, userInfo.name);
    // ユーザーが検索ボタンをクリック
    await user.click(button);

    // APIリクエストの完了を待って、ユーザー情報が画面に表示されたことを検証
    await waitFor(() => {
      expect(screen.getByText(userInfo.name)).toBeInTheDocument();
    });
  });
});
