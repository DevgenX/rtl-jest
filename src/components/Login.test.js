import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test("username input should be rendered", () => {
  render(<Login />);
  const userInput = screen.getByPlaceholderText(/username/i);
  expect(userInput).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(passwordInput).toBeInTheDocument();
});

test("button input should be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Login />);
  const userInput = screen.getByPlaceholderText(/username/i);
  expect(userInput.value).toBe("");
});

test("password input should be empty", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(passwordInput.value).toBe("");
});

test("button should be disabled", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

test("loading should not be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/Please wait/i);
});

test("error shouldn't be visible", () => {
  render(<Login />);
  const error = screen.getByTestId("error");
  expect(error).not.toBeVisible();
});

test("username input should change", () => {
  render(<Login />);
  const userInput = screen.getByPlaceholderText(/username/i);
  const testValue = "testValue";

  fireEvent.change(userInput, { target: { value: testValue } });
  expect(userInput.value).toBe(testValue);
});

test("password input should change", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const testPass = "testPass";
  fireEvent.change(passwordInput, { target: { value: testPass } });

  expect(passwordInput.value).toBe(testPass);
});

test("button shouldn't be disabled when inputs exist", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const userInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(userInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });

  expect(buttonEl).not.toBeDisabled();
});

test("loading should be rendered when clicked", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const userInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(userInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(buttonEl);
  expect(buttonEl).toHaveTextContent(/please wait/i);
});

test("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const userInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(userInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(buttonEl);
  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait/i));
});

test("User should be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const userInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(userInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  // async query
  const userItem = await screen.findByText("John");

  expect(userItem).toBeInTheDocument();
});
