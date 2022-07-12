import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { validateEmail }  from "../Login";

describe("Test Login component", () => {
  test("render form with 1 button", async () => {
    render(<Login />);
    const buttonList = await screen.findAllByRole("button");
    // console.log(buttonList);
    expect(buttonList).toHaveLength(1);
  });

  test("should be failed on email validation", () => {
    const testEmail = "hogehoge.com";
    expect(validateEmail(testEmail)).not.toBe(true);
  });

  test("should be successed on email validation", () => {
    const testEmail = "hoge@hoge.com";
    expect(validateEmail(testEmail)).toBe(true);
  });

  test("password input should have type password", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("パスワード入力");
    expect(password).toHaveAttribute("type", "password");
  });

  test("should be able to submit the form", () => {
    const inputEmail = "hoge@hoge.com"

    render(<Login />);

    // getByTestIdを使うと、data-testidに該当する値が設定された要素を探す
    const submitButton = screen.getByTestId("submit");
    const email = screen.getByPlaceholderText("メールアドレス入力");
    const password = screen.getByPlaceholderText("パスワード入力");

    userEvent.type(email, inputEmail);
    userEvent.type(password, "hogepassword");
    userEvent.click(submitButton);

    // const userInfo = screen.getByText("hoge@hoge.com");
    // expect(userInfo).toBeInTheDocument();
    /*
    上のテスト方法だと、他にメールアドレスを表示している部分があったら、
    その要素を持ってきてしまう。
    試しにpタグでhoge@hoge.comと書いておいたところ、正常系では
    2つの要素がヒットしてしまいテスト失敗となった。
    該当する要素が複数ある場合は、getALL〜の関数を使わないとエラー扱いになる。
    また、異常系においてはpタグが1つだけヒットして、テスト成功になってしまった。
    そのため、以下のようなテストの記述の方が適しているのではないだろうか。
    */
    const userInfo = screen.getByTestId("user");
    expect(userInfo.textContent).toEqual(inputEmail);
    // expect(userInfo.textContent).toEqual(inputEmail);
  });
});
