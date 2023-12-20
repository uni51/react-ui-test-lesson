import Form from "./Form";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta = {
  title: "Form",
  component: Form,
} as Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {};

export const Testing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    await expect(input).toHaveTextContent("");
    await userEvent.type(input, "play function");
    await expect(canvas.getByDisplayValue("play function")).toBeInTheDocument();
  },
};
